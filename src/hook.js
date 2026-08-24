const parse = require('url').parse;
const crypto = require('./crypto');
const request = require('./request');
const match = require('./provider/match');
const querystring = require('querystring');
const { isHost, cookieToMap, mapToCookie } = require('./utilities');
const { getManagedCacheStorage } = require('./cache');
const { logScope } = require('./logger');

const logger = logScope('hook');
const cs = getManagedCacheStorage('hook');
cs.aliveDuration = 7 * 24 * 60 * 60 * 1000;

const ENABLE_LOCAL_VIP = ['true', 'cvip', 'svip'].includes(
	(process.env.ENABLE_LOCAL_VIP || '').toLowerCase()
);
const BLOCK_ADS = (process.env.BLOCK_ADS || '').toLowerCase() === 'true';
const DISABLE_UPGRADE_CHECK =
	(process.env.DISABLE_UPGRADE_CHECK || '').toLowerCase() === 'true';
const ENABLE_LOCAL_SVIP =
	(process.env.ENABLE_LOCAL_VIP || '').toLowerCase() === 'svip';
const LOCAL_VIP_UID = (process.env.LOCAL_VIP_UID || '')
	.split(',')
	.map((str) => parseInt(str))
	.filter((num) => !Number.isNaN(num));
// Clients that cannot play the package endpoint over TLS, and so are handed
// plain HTTP (#84). `PACKAGE_SCHEME` overrides the choice for every client.
const PLAIN_ENDPOINT_OS = new Set(
	(process.env.PLAIN_ENDPOINT_OS || 'pc,uwp')
		.split(',')
		.map((str) => str.trim().toLowerCase())
		.filter(Boolean)
);
const PACKAGE_SCHEME = (process.env.PACKAGE_SCHEME || '').toLowerCase();

const hook = {
	request: {
		before: () => {},
		after: () => {},
	},
	connect: {
		before: () => {},
	},
	negotiate: {
		before: () => {},
	},
	target: {
		host: new Set(),
		path: new Set(),
	},
};

hook.target.host = new Set([
	'music.163.com',
	'interface.music.163.com',
	'interface3.music.163.com',
	'interfacepc.music.163.com',
	'apm.music.163.com',
	'apm3.music.163.com',
	'interface.music.163.com.163jiasu.com',
	'interface3.music.163.com.163jiasu.com',
	// 'mam.netease.com',
	// 'api.iplay.163.com', // look living
	// 'ac.dun.163yun.com',
	// 'crash.163.com',
	// 'clientlog.music.163.com',
	// 'clientlog3.music.163.com'
]);

hook.target.path = new Set([
	'/api/v3/playlist/detail',
	// Song details: v3 is what the current client asks for, the two older
	// endpoints are still in use by clients that have not moved on.
	'/api/song/detail',
	'/api/v2/song/detail',
	'/api/v3/song/detail',
	'/api/v6/playlist/detail',
	'/api/album/play',
	'/api/artist/privilege',
	'/api/album/privilege',
	'/api/v1/artist',
	'/api/v1/artist/songs',
	'/api/v2/artist/songs',
	'/api/artist/top/song',
	'/api/album',
	'/api/v1/album',
	'/api/album/v3/detail',
	'/api/playlist/privilege',
	'/api/song/enhance/player/url',
	'/api/song/enhance/player/url/v1',
	'/api/song/enhance/download/url',
	'/api/song/enhance/download/url/v1',
	'/api/song/enhance/privilege',
	'/api/ad',
	'/batch',
	'/api/batch',
	'/api/listen/together/privilege/get',
	'/api/playmode/intelligence/list',
	'/api/v1/search/get',
	'/api/v1/search/song/get',
	'/api/search/complex/get',
	'/api/search/complex/page',
	'/api/search/pc/complex/get',
	'/api/search/pc/complex/page',
	'/api/search/song/list/page',
	'/api/search/song/page',
	'/api/cloudsearch/pc',
	'/api/v1/playlist/manipulate/tracks',
	'/api/song/like',
	'/api/v1/play/record',
	'/api/playlist/v4/detail',
	'/api/v1/radio/get',
	// Daily recommendations, every generation the clients in the wild use.
	'/api/v1/discovery/recommend/songs',
	'/api/v2/discovery/recommend/songs',
	'/api/v3/discovery/recommend/songs',
	'/api/usertool/sound/mobile/promote',
	'/api/usertool/sound/mobile/theme',
	'/api/usertool/sound/mobile/animationList',
	'/api/usertool/sound/mobile/all',
	'/api/usertool/sound/mobile/detail',
	'/api/vipauth/app/auth/query',
	'/api/music-vip-membership/client/vip/info',
	'/api/music-vip-membership/front/vip/info',
	'/api/nuser/account/get',
	'/api/w/nuser/account/get',
]);

// The membership state reaches the client on two unrelated responses, and both
// have to agree or the status looks unchanged: the entitlement endpoint says
// what the account may play, while the account endpoint carries the flag the
// badge is drawn from. Each has an older and a newer variant that are both
// still served, and any of them may show up standalone or inside a `/batch`.
const VIP_INFO_PATHS = [
	'/api/music-vip-membership/client/vip/info',
	'/api/music-vip-membership/front/vip/info',
];
const VIP_ACCOUNT_PATHS = [
	'/api/nuser/account/get',
	'/api/w/nuser/account/get',
];

const domainList = [
	'music.163.com',
	'music.126.net',
	'iplay.163.com',
	'look.163.com',
	'y.163.com',
	'interface.music.163.com',
	'interface3.music.163.com',
];

/**
 * The `x-encr-sskey` a xeapi response carries is the very key the client will
 * encrypt its following requests with, and it arrives as a plain header — so
 * remembering it here is what lets the proxy read those requests.
 *
 * @type {Map<string, string>} Session id to session key.
 */
const xeapiSessions = new Map();
const xeapiSessionLimit = 32;

const rememberXeapiSession = (headers) => {
	const id = headers['x-encr-ssid'];
	const key = headers['x-encr-sskey'];
	if (!id || !key || xeapiSessions.get(id) === key) return;
	xeapiSessions.set(id, key);
	while (xeapiSessions.size > xeapiSessionLimit)
		xeapiSessions.delete(xeapiSessions.keys().next().value);
	logger.debug(`Remembered the xeapi session ${id}.`);
};

/**
 * Read the form parameters out of a xeapi request body. The session the
 * request belongs to is named in `R`, which is sealed with a well-known key;
 * the parameters in `B` need that session's key, so they stay unreadable until
 * a response has handed the session over. An empty object is returned in that
 * case — the hook then works off the response alone.
 *
 * @param {string} body The raw, url-encoded request body.
 * @return {Record<string, string>}
 */
const readXeapiParam = (body) => {
	const { B, R } = querystring.parse(body);
	if (!B || !R) return {};
	// A `+` that reached us unescaped was decoded into a space; base64 never
	// holds one, so putting it back is always safe.
	const unbase64 = (value) => Buffer.from(value.replace(/ /g, '+'), 'base64');
	let id = '';
	try {
		id = crypto.xeapi.decryptSession(unbase64(R))[1];
		const key = xeapiSessions.get(id);
		if (!key) {
			logger.debug(
				`The xeapi session ${
					id || '(not established yet)'
				} is unknown, so the request parameters stay sealed.`
			);
			return {};
		}
		const { body: param } = JSON.parse(
			crypto.xeapi
				.decryptRequest(unbase64(B), Buffer.from(key))
				.toString()
		);
		return param
			? querystring.parse(Buffer.from(param, 'base64').toString())
			: {};
	} catch (error) {
		logger.debug(
			{ err: error },
			`Unable to read the parameters of the xeapi session ${id}.`
		);
		return {};
	}
};

hook.request.before = (ctx) => {
	const { req } = ctx;
	req.url =
		(req.url.startsWith('http://')
			? ''
			: (req.socket.encrypted ? 'https:' : 'http:') +
				'//' +
				(domainList.some((domain) =>
					(req.headers.host || '').includes(domain)
				)
					? req.headers.host
					: null)) + req.url;
	const url = parse(req.url);
	if (
		[url.hostname, req.headers.host].some((host) =>
			isHost(host, 'music.163.com')
		)
	)
		ctx.decision = 'proxy';

	if (process.env.NETEASE_COOKIE && url.path.includes('url')) {
		var cookies = cookieToMap(req.headers.cookie);
		var new_cookies = cookieToMap(process.env.NETEASE_COOKIE);

		Object.entries(new_cookies).forEach(([key, value]) => {
			cookies[key] = value;
		});

		req.headers.cookie = mapToCookie(cookies);
		logger.debug('Replace netease cookie');
	}

	if (
		[url.hostname, req.headers.host].some((host) =>
			hook.target.host.has(host)
		) &&
		req.method === 'POST' &&
		(url.path.startsWith('/eapi/') || // eapi
			url.path.startsWith('/xeapi/') || // xeapi
			// url.path.startsWith('/api/') || // api
			url.path.startsWith('/api/linux/forward')) // linuxapi
	) {
		return request
			.read(req)
			.then((body) => (req.body = body))
			.then((body) => {
				if ('x-napm-retry' in req.headers)
					delete req.headers['x-napm-retry'];
				req.headers['X-Real-IP'] = '118.88.88.88';
				// xeapi always answers gzipped, and the codec handles that on
				// its own; for eapi we opt out so the body stays plain JSON.
				if ('x-aeapi' in req.headers && !url.path.startsWith('/xeapi/'))
					req.headers['x-aeapi'] = 'false';
				if (
					req.url.includes('stream') ||
					req.url.includes('/eapi/cloud/upload/check')
				)
					return; // look living/cloudupload eapi can not be decrypted
				if (req.headers['Accept-Encoding'])
					req.headers['Accept-Encoding'] = 'gzip, deflate'; // https://blog.csdn.net/u013022222/article/details/51707352
				if (body) {
					const netease = {};
					netease.pad = (body.match(/%0+$/) || [''])[0];
					if (url.path === '/api/linux/forward') {
						netease.crypto = 'linuxapi';
					} else if (url.path.startsWith('/eapi/')) {
						netease.crypto = 'eapi';
					} else if (url.path.startsWith('/xeapi/')) {
						netease.crypto = 'xeapi';
					} else if (url.path.startsWith('/api/')) {
						netease.crypto = 'api';
					}
					let data;
					switch (netease.crypto) {
						case 'linuxapi':
							data = JSON.parse(
								crypto.linuxapi
									.decrypt(
										Buffer.from(
											body.slice(
												8,
												body.length - netease.pad.length
											),
											'hex'
										)
									)
									.toString()
							);
							netease.path = parse(data.url).path;
							netease.param = data.params;
							break;
						case 'eapi':
							data = crypto.eapi
								.decrypt(
									Buffer.from(
										body.slice(
											7,
											body.length - netease.pad.length
										),
										'hex'
									)
								)
								.toString()
								.split('-36cd479b6b5-');
							netease.path = data[0];
							netease.param = JSON.parse(data[1]);
							if (
								netease.param.hasOwnProperty('e_r') &&
								(netease.param.e_r == 'true' ||
									netease.param.e_r == true)
							) {
								// eapi's e_r is true, needs to be encrypted
								netease.e_r = true;
							} else {
								netease.e_r = false;
							}
							break;
						case 'xeapi':
							// The path is not part of the ciphertext here, it
							// is the request URL itself.
							netease.path =
								'/api/' +
								url.path
									.slice('/xeapi/'.length)
									.split('?')
									.shift();
							netease.param = readXeapiParam(body);
							netease.e_r = true; // xeapi is always encrypted
							break;
						case 'api':
							data = {};
							decodeURIComponent(body)
								.split('&')
								.forEach((pair) => {
									let [key, value] = pair.split('=');
									data[key] = value;
								});
							netease.path = url.path;
							netease.param = data;
							break;
						default:
							// unsupported crypto
							break;
					}
					netease.path = netease.path.replace(/\/\d*$/, '');
					ctx.netease = netease;
					// console.log(netease.path, netease.param)

					// The download endpoints are answered by asking for the
					// playable URL instead, which needs the request to be
					// re-encrypted — impossible for xeapi, whose key only the
					// upstream server holds. Its response is matched as-is.
					if (netease.crypto !== 'xeapi') {
						if (netease.path === '/api/song/enhance/download/url')
							return pretendPlay(ctx);

						if (
							netease.path === '/api/song/enhance/download/url/v1'
						)
							return pretendPlayV1(ctx);
					}

					if (BLOCK_ADS) {
						if (netease.path.startsWith('/api/ad')) {
							ctx.error = new Error('ADs blocked.');
							ctx.decision = 'close';
						}
					}

					if (DISABLE_UPGRADE_CHECK) {
						if (
							netease.path.match(
								/^\/api(\/v1)?\/(android|ios|osx|pc)\/(upgrade|version)/
							)
						) {
							ctx.error = new Error('Upgrade check blocked.');
							ctx.decision = 'close';
						}
					}
				}
			})
			.catch(
				(error) =>
					error &&
					logger.error(
						error,
						`A error occurred in hook.request.before when hooking ${req.url}.`
					)
			);
	} else if (
		hook.target.host.has(url.hostname) &&
		(url.path.startsWith('/weapi/') || url.path.startsWith('/api/'))
	) {
		req.headers['X-Real-IP'] = '118.88.88.88';
		ctx.netease = {
			web: true,
			path: url.path
				.replace(/^\/weapi\//, '/api/')
				.split('?')
				.shift() // remove the query parameters
				.replace(/\/\d*$/, ''),
		};
	} else if (req.url.includes('package')) {
		try {
			const data = req.url.split('package/').pop().split('/');
			const url = parse(crypto.base64.decode(data[0]));
			const id = data[1].replace(/\.\w+/, '');
			req.url = url.href;
			req.headers['host'] = url.hostname;
			req.headers['cookie'] = null;
			ctx.package = { id };
			ctx.decision = 'proxy';
			// if (url.href.includes('google'))
			// 	return request('GET', req.url, req.headers, null, parse('http://127.0.0.1:1080'))
			// 	.then(response => (ctx.res.writeHead(response.statusCode, response.headers), response.pipe(ctx.res)))
		} catch (error) {
			ctx.error = error;
			ctx.decision = 'close';
		}
	}
};

hook.request.after = (ctx) => {
	const { req, proxyRes, netease, package: pkg } = ctx;
	if (
		req.headers.host === 'tyst.migu.cn' &&
		proxyRes.headers['content-range'] &&
		proxyRes.statusCode === 200
	)
		proxyRes.statusCode = 206;
	// Do this for every xeapi response, patched or not: the session it hands
	// over is what unseals the requests that come after it.
	if (netease && netease.crypto === 'xeapi')
		rememberXeapiSession(proxyRes.headers);
	if (
		netease &&
		hook.target.path.has(netease.path) &&
		proxyRes.statusCode === 200
	) {
		return request
			.read(proxyRes, true)
			.then((buffer) =>
				buffer.length ? (proxyRes.body = buffer) : Promise.reject()
			)
			.then((buffer) => {
				// The body has been buffered, and `read()` already undid any
				// transfer compression. Drop the headers that described the
				// original framing now rather than after the patching, so a
				// response we end up not parsing is still served in a shape
				// that matches these headers.
				['transfer-encoding', 'content-encoding', 'content-length']
					.filter((key) => key in proxyRes.headers)
					.forEach((key) => delete proxyRes.headers[key]);

				const patch = (string) =>
					string.replace(
						/([^\\]"\s*:\s*)(\d{16,})(\s*[}|,])/g,
						'$1"$2L"$3'
					); // for js precision

				if (netease.e_r) {
					// The response is encrypted (eapi's e_r, or any xeapi
					// one), and may carry a gzip stream inside.
					const { body, compressed } =
						crypto.eapi.decryptResponse(buffer);
					netease.compressed = compressed;
					netease.jsonBody = JSON.parse(patch(body.toString()));
				} else {
					netease.jsonBody = JSON.parse(patch(buffer.toString()));
				}

				if (ENABLE_LOCAL_VIP) applyLocalVip(netease);

				if (
					new Set([401, 512]).has(netease.jsonBody.code) &&
					!netease.web
				) {
					if (netease.path.includes('manipulate'))
						return tryCollect(ctx);
					else if (netease.path === '/api/song/like')
						return tryLike(ctx);
				} else if (netease.path.includes('url')) return tryMatch(ctx);
				else if (netease.path.includes('/usertool/sound/'))
					return unblockSoundEffects(netease.jsonBody);
				else if (netease.path.includes('batch')) {
					for (const key in netease.jsonBody) {
						if (key.includes('/usertool/sound/'))
							unblockSoundEffects(netease.jsonBody[key]);
					}
				} else if (netease.path.includes('/vipauth/app/auth/query'))
					return unblockLyricsEffects(netease.jsonBody);
			})
			.then(() => {
				const inject = (key, value) => {
					if (typeof value === 'object' && value != null) {
						if ('cp' in value) value['cp'] = 1;
						if ('fee' in value) value['fee'] = 0;
						if (
							'downloadMaxbr' in value &&
							value['downloadMaxbr'] === 0
						)
							value['downloadMaxbr'] = 320000;
						if (
							'dl' in value &&
							'downloadMaxbr' in value &&
							value['dl'] < value['downloadMaxbr']
						)
							value['dl'] = value['downloadMaxbr'];
						if ('playMaxbr' in value && value['playMaxbr'] === 0)
							value['playMaxbr'] = 320000;
						if (
							'pl' in value &&
							'playMaxbr' in value &&
							value['pl'] < value['playMaxbr']
						)
							value['pl'] = value['playMaxbr'];
						if ('sp' in value && 'st' in value && 'subp' in value) {
							// batch modify
							value['sp'] = 7;
							value['st'] = 0;
							value['subp'] = 1;
						}
						if (
							'start' in value &&
							'end' in value &&
							'playable' in value &&
							'unplayableType' in value &&
							'unplayableUserIds' in value
						) {
							value['start'] = 0;
							value['end'] = 0;
							value['playable'] = true;
							value['unplayableType'] = 'unknown';
							value['unplayableUserIds'] = [];
						}
						if ('noCopyrightRcmd' in value)
							value['noCopyrightRcmd'] = null;
						if ('payed' in value && value['payed'] == 0)
							value['payed'] = 1;
						if ('flLevel' in value && value['flLevel'] === 'none')
							value['flLevel'] = 'exhigh';
						if ('plLevel' in value && value['plLevel'] === 'none')
							value['plLevel'] = 'exhigh';
						if ('dlLevel' in value && value['dlLevel'] === 'none')
							value['dlLevel'] = 'exhigh';
					}
					return value;
				};

				let body = JSON.stringify(netease.jsonBody, inject);
				body = body.replace(
					/([^\\]"\s*:\s*)"(\d{16,})L"(\s*[}|,])/g,
					'$1$2$3'
				); // for js precision
				proxyRes.body = netease.e_r // answer in the shape it arrived in
					? crypto.eapi.encryptResponse(
							Buffer.from(body),
							netease.compressed
						)
					: body;
			})
			.catch(
				(error) =>
					error &&
					logger.error(
						error,
						`A error occurred in hook.request.after when hooking ${req.url}.`
					)
			);
	} else if (pkg) {
		if (new Set([201, 301, 302, 303, 307, 308]).has(proxyRes.statusCode)) {
			return request(
				req.method,
				parse(req.url).resolve(proxyRes.headers.location),
				req.headers
			).then((response) => (ctx.proxyRes = response));
		} else if (/p\d+c*\.music\.126\.net/.test(req.url)) {
			proxyRes.headers['content-type'] = 'audio/*';
		}
	}
};

hook.connect.before = (ctx) => {
	const { req } = ctx;
	const url = parse('https://' + req.url);
	if (
		[url.hostname, req.headers.host].some((host) =>
			hook.target.host.has(host)
		)
	) {
		if (parseInt(url.port) === 80) {
			req.url = `${global.address || 'localhost'}:${global.port[0]}`;
			req.local = true;
		} else if (global.port[1]) {
			req.url = `${global.address || 'localhost'}:${global.port[1]}`;
			req.local = true;
		} else {
			ctx.decision = 'blank';
		}
	} else if (url.href.includes(global.endpoint)) ctx.decision = 'proxy';
};

hook.negotiate.before = (ctx) => {
	const { req, socket, decision } = ctx;
	const url = parse('https://' + req.url);
	const target = hook.target.host;
	if (req.local || decision) return;
	if (target.has(socket.sni) && !target.has(url.hostname)) {
		target.add(url.hostname);
		ctx.decision = 'blank';
	}
};

/**
 * Rewrite the membership responses so the client believes it is a paying
 * member. This has to cover both signals: the entitlement endpoint the player
 * consults for playback, and the account endpoint the VIP badge is drawn from.
 * Either may arrive on its own or as one entry of a `/batch`.
 *
 * @param {{ path: string, jsonBody: Record<string, any> }} netease
 */
const applyLocalVip = (netease) => {
	const batched = netease.path === '/batch' || netease.path === '/api/batch';
	const entry = (path) =>
		batched
			? netease.jsonBody[path]
			: netease.path === path
				? netease.jsonBody
				: undefined;
	const store = (path, value) => {
		if (batched) netease.jsonBody[path] = value;
		else netease.jsonBody = value;
	};

	VIP_INFO_PATHS.forEach((path) => {
		const info = entry(path);
		if (info === undefined) return;
		if (patchVipEntitlement(info)) {
			store(path, info);
			logger.debug(`Applied the local VIP on ${path}.`);
		}
	});

	VIP_ACCOUNT_PATHS.forEach((path) => {
		const account = entry(path);
		if (account === undefined) return;
		if (patchVipAccount(account)) {
			store(path, account);
			logger.debug(`Applied the local VIP on ${path}.`);
		}
	});
};

/**
 * The entitlement response: `associator`/`redplus`/`musicPackage` describe what
 * the account is allowed to play. `redplus` is the SVIP tier.
 *
 * @param {Record<string, any>} info
 * @return {boolean} Whether the response was patched.
 */
const patchVipEntitlement = (info) => {
	if (!info || !info.data) return false;
	if (LOCAL_VIP_UID.length !== 0 && !LOCAL_VIP_UID.includes(info.data.userId))
		return false;

	const defaultPackage = {
		iconUrl: null,
		dynamicIconUrl: null,
		isSign: false,
		isSignIap: false,
		isSignDeduct: false,
		isSignIapDeduct: false,
	};
	const vipLevel = 7; // ? months

	try {
		const nowTime = info.data.now || new Date().getTime();
		const expireTime = nowTime + 31622400000;
		info.data.redVipLevel = vipLevel;
		info.data.redVipAnnualCount = 1;

		info.data.musicPackage = {
			...defaultPackage,
			...info.data.musicPackage,
			vipCode: 230,
			vipLevel,
			expireTime,
		};

		info.data.associator = {
			...defaultPackage,
			...info.data.associator,
			vipCode: 100,
			vipLevel,
			expireTime,
		};

		if (ENABLE_LOCAL_SVIP) {
			info.data.redplus = {
				...defaultPackage,
				...info.data.redplus,
				vipCode: 300,
				vipLevel,
				expireTime,
			};

			info.data.albumVip = {
				...defaultPackage,
				...info.data.albumVip,
				vipCode: 400,
				vipLevel: 0,
				expireTime,
			};
		}
		return true;
	} catch (error) {
		logger.debug({ err: error }, 'Unable to apply the local VIP.');
		return false;
	}
};

/**
 * The account response: `profile.vipType` is the flag the client draws the VIP
 * badge from. `11` is the ordinary black-vinyl VIP, `100` the SVIP tier. Left
 * untouched, the entitlement patch above shows nothing on the profile itself.
 *
 * @param {Record<string, any>} account
 * @return {boolean} Whether the response was patched.
 */
const patchVipAccount = (account) => {
	const profile = account && account.profile;
	if (!profile) return false;
	if (LOCAL_VIP_UID.length !== 0 && !LOCAL_VIP_UID.includes(profile.userId))
		return false;

	try {
		profile.vipType = ENABLE_LOCAL_SVIP ? 100 : 11;
		return true;
	} catch (error) {
		logger.debug({ err: error }, 'Unable to apply the local VIP account.');
		return false;
	}
};

const pretendPlay = (ctx) => {
	const { req, netease } = ctx;
	const turn = 'http://music.163.com/api/song/enhance/player/url';
	let query;
	const { id, br, e_r, header } = netease.param;
	switch (netease.crypto) {
		case 'linuxapi':
			netease.param = { ids: `["${id}"]`, br };
			query = crypto.linuxapi.encryptRequest(turn, netease.param);
			break;
		case 'eapi':
		case 'api':
			netease.param = { ids: `["${id}"]`, br, e_r, header };
			if (netease.crypto == 'eapi')
				query = crypto.eapi.encryptRequest(turn, netease.param);
			else if (netease.crypto == 'api')
				query = crypto.api.encryptRequest(turn, netease.param);
			break;
		default:
			break;
	}
	req.url = query.url;
	req.body = query.body + netease.pad;
};

const pretendPlayV1 = (ctx) => {
	const { req, netease } = ctx;
	const turn = 'http://music.163.com/api/song/enhance/player/url/v1';
	let query;
	const { id, level, immerseType, e_r, header } = netease.param;
	switch (netease.crypto) {
		case 'linuxapi':
			netease.param = {
				ids: `["${id}"]`,
				level,
				encodeType: 'flac',
				immerseType,
			};
			query = crypto.linuxapi.encryptRequest(turn, netease.param);
			break;
		case 'eapi':
		case 'api':
			netease.param = {
				ids: `["${id}"]`,
				level,
				encodeType: 'flac',
				immerseType,
				e_r,
				header,
			};
			if (netease.crypto == 'eapi')
				query = crypto.eapi.encryptRequest(turn, netease.param);
			else if (netease.crypto == 'api')
				query = crypto.api.encryptRequest(turn, netease.param);
			break;
		default:
			break;
	}
	req.url = query.url;
	req.body = query.body + netease.pad;
};

const tryCollect = (ctx) => {
	const { req, netease } = ctx;
	const { trackIds, pid, op } = netease.param;
	const trackId = (
		Array.isArray(trackIds) ? trackIds : JSON.parse(trackIds)
	)[0];
	return request(
		'POST',
		'http://music.163.com/api/playlist/manipulate/tracks',
		req.headers,
		`trackIds=[${trackId},${trackId}]&pid=${pid}&op=${op}`
	)
		.then((response) => response.json())
		.then((jsonBody) => {
			netease.jsonBody = jsonBody;
		})
		.catch((e) => e && logger.error(e));
};

const tryLike = (ctx) => {
	const { req, netease } = ctx;
	const { trackId } = netease.param;
	let pid = 0,
		userId = 0;
	return request('GET', 'http://music.163.com/api/v1/user/info', req.headers)
		.then((response) => response.json())
		.then((jsonBody) => {
			userId = jsonBody.userPoint.userId;
			return request(
				'GET',
				`http://music.163.com/api/user/playlist?uid=${userId}&limit=1`,
				req.headers
			).then((response) => response.json());
		})
		.then((jsonBody) => {
			pid = jsonBody.playlist[0].id;
			return request(
				'POST',
				'http://music.163.com/api/playlist/manipulate/tracks',
				req.headers,
				`trackIds=[${trackId},${trackId}]&pid=${pid}&op=add`
			).then((response) => response.json());
		})
		.then((jsonBody) => {
			if (new Set([200, 502]).has(jsonBody.code)) {
				netease.jsonBody = { code: 200, playlistId: pid };
			}
		})
		.catch((e) => e && logger.error(e));
};

const computeHash = (task) =>
	request('GET', task.url).then((response) => crypto.md5.pipe(response));

/**
 * The quality tier a bitrate belongs to, in the vocabulary the newer clients
 * use in place of a raw `br`.
 *
 * @param {number} br
 * @return {string}
 */
const audioLevel = (br) => {
	if (br >= 999000) return 'lossless';
	if (br >= 320000) return 'exhigh';
	if (br >= 192000) return 'higher';
	return 'standard';
};

/**
 * Which client is asking, so the replacement can be handed over in the shape
 * it accepts. eapi states it in the `header` parameter, a xeapi request states
 * it in its own headers instead, and the cookie is the last resort.
 *
 * @param {import('http').IncomingMessage} req
 * @param {{ param: Record<string, unknown> }} netease
 * @return {{ os: string, version: string }}
 */
const clientPlatform = (req, netease) => {
	let header = {};
	try {
		const { header: value } = netease.param;
		header = (typeof value === 'string' ? JSON.parse(value) : value) || {};
	} catch (e) {}
	const cookie = querystring.parse(
		(req.headers.cookie || '').replace(/\s/g, ''),
		';'
	);
	return {
		os: header.os || req.headers['x-os'] || cookie.os || '',
		version:
			header.appver || req.headers['x-appver'] || cookie.appver || '',
	};
};

/**
 * The host the replacement is handed over on. Some clients cannot play the
 * package endpoint over TLS (#84) and are served plain HTTP, which is picked
 * from the platform they report. A client that reports no platform gets the
 * endpoint as configured; set `PACKAGE_SCHEME` to `http` or `https` to decide
 * for it rather than have the scheme guessed.
 *
 * @param {string} os
 * @return {string}
 */
const packageEndpoint = (os) => {
	const plain = () => global.endpoint.replace('https://', 'http://');
	if (PACKAGE_SCHEME === 'http') return plain();
	if (PACKAGE_SCHEME === 'https')
		return global.endpoint.replace('http://', 'https://');
	return PLAIN_ENDPOINT_OS.has(os) ? plain() : global.endpoint;
};

const tryMatch = (ctx) => {
	const { req, netease } = ctx;
	const { jsonBody } = netease;
	/** @type {number} */
	const min_br = Number(process.env.MIN_BR) || 0;
	/** @type {Promise<any>[]} */
	let tasks;
	let target = 0;

	const inject = (item) => {
		item.flag = 0;
		// A response to a download request may leave the id out, so fall back
		// to the one that was asked for.
		const songId = item.id || requestedId(netease.param);
		if (
			songId &&
			(item.code !== 200 || item.freeTrialInfo || item.br < min_br) &&
			(target === 0 || songId === target)
		) {
			return match(songId)
				.then((song) => {
					const { os } = clientPlatform(req, netease);
					item.type = song.br === 999000 ? 'flac' : 'mp3';
					item.url = global.endpoint
						? `${packageEndpoint(os)}/package/${crypto.base64.encode(
								song.url
							)}/${songId}.${item.type}`
						: song.url;
					item.md5 = song.md5 || crypto.md5.digest(song.url);
					item.br = song.br || 128000;
					item.size = song.size;
					item.code = 200;
					item.freeTrialInfo = null;
					// A grey response leaves these null, and a player that
					// reads the quality from them refuses a track it cannot
					// classify. Describe the replacement the way upstream
					// describes a track it serves itself.
					item.encodeType = item.type;
					item.level = audioLevel(item.br);
					if ('time' in item && !item.time && song.duration)
						item.time = song.duration;
					return song;
				})
				.then((song) => {
					if (!netease.path.includes('download') || song.md5) return;
					const newer = (base, target) => {
						const difference = Array.from([base, target])
							.map((version) =>
								version
									.split('.')
									.slice(0, 3)
									.map((number) => parseInt(number) || 0)
							)
							.reduce(
								(aggregation, current) =>
									!aggregation.length
										? current.map((element) => [element])
										: aggregation.map((element, index) =>
												element.concat(current[index])
											),
								[]
							)
							.filter((pair) => pair[0] !== pair[1])[0];
						return !difference || difference[0] <= difference[1];
					};
					const limit = { android: '0.0.0', osx: '0.0.0' };
					const task = {
						key: song.url
							.replace(/\?.*$/, '')
							.replace(/(?<=kugou\.com\/)\w+\/\w+\//, '')
							.replace(/(?<=kuwo\.cn\/)\w+\/\w+\/resource\//, ''),
						url: song.url,
					};
					const { os, version } = clientPlatform(req, netease);
					if (os in limit && newer(limit[os], version)) {
						return cs
							.cache(task, () => computeHash(task))
							.then((value) => (item.md5 = value));
					}
				})
				.catch((e) => e && logger.error(e));
		} else if (item.code === 200 && netease.web) {
			item.url = item.url.replace(
				/(m\d+?)(?!c)\.music\.126\.net/,
				'$1c.music.126.net'
			);
		}
	};

	if (!Array.isArray(jsonBody.data)) {
		tasks = [inject(jsonBody.data)];
	} else if (netease.path.includes('download')) {
		jsonBody.data = jsonBody.data[0];
		tasks = [inject(jsonBody.data)];
	} else {
		target = netease.web ? 0 : requestedId(netease.param); // reduce time cost
		tasks = jsonBody.data.map((item) => inject(item));
	}
	return Promise.all(tasks).catch((e) => e && logger.error(e));
};

/**
 * The id the client asked for, used to skip matching the rest of a response.
 * Zero when the request parameters are unknown — which is the case for a xeapi
 * request of a session the proxy has not seen the key of yet, and means every
 * item of the response gets matched instead.
 *
 * @param {Record<string, unknown>} param
 * @return {number}
 */
const requestedId = (param) => {
	try {
		const { ids } = param;
		const list = Array.isArray(ids) ? ids : JSON.parse(ids);
		return (
			parseInt((list[0] || 0).toString().replace('_0', '')) ||
			parseInt(param.id) ||
			0
		);
	} catch (e) {
		return parseInt(param.id) || 0;
	}
};

const unblockSoundEffects = (obj) => {
	logger.debug('unblockSoundEffects() has been triggered.');
	const { data, code } = obj;
	if (code === 200) {
		if (Array.isArray(data))
			data.map((item) => {
				if (item.type) item.type = 1;
			});
		else if (data.type) data.type = 1;
	}
};

const unblockLyricsEffects = (obj) => {
	logger.debug('unblockLyricsEffects() has been triggered.');
	const { data, code } = obj;
	if (code === 200 && Array.isArray(data)) {
		data.forEach((item) => {
			if ('canUse' in item) item.canUse = true;
			if ('canNotUseReasonCode' in item) item.canNotUseReasonCode = 200;
		});
	}
};

module.exports = hook;
