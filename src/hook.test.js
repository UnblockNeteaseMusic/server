jest.mock('./provider/match', () => jest.fn());
jest.mock('./request', () => {
	const request = jest.fn();
	request.read = jest.fn();
	return request;
});

const crypto = require('./crypto');
const hook = require('./hook');
const match = require('./provider/match');
const request = require('./request');

const track = {
	url: 'https://example.invalid/audio',
	br: 320000,
	duration: 180000,
	md5: 'test',
};

const response = async (netease, body) => {
	const req = { headers: {}, url: 'https://music.163.com' };
	const proxyRes = { statusCode: 200, headers: {} };
	const input = Buffer.from(JSON.stringify(body));
	request.read.mockResolvedValueOnce(
		netease.e_r ? crypto.eapi.encryptResponse(input, true) : input
	);
	await hook.request.after({ req, netease, proxyRes });
	return JSON.parse(
		netease.e_r
			? crypto.eapi.decryptResponse(proxyRes.body).body.toString()
			: proxyRes.body
	);
};

beforeEach(() => {
	jest.resetAllMocks();
});

test('limits configured Netease headers to supported Netease hosts', async () => {
	jest.replaceProperty(process, 'env', {
		...process.env,
		NETEASE_COOKIE: 'MUSIC_U=test',
		NETEASE_USER_AGENT: 'test-agent',
		NETEASE_MCONFIG_INFO: 'test-config',
	});
	try {
		for (const [host, cookie, expectedCookie] of [
			['example.invalid', undefined, undefined],
			['interface.music.163.com', 'os=pc', 'os=pc; MUSIC_U=test'],
			['music.163.com', undefined, 'MUSIC_U=test'],
		]) {
			const headers = cookie ? { host, cookie } : { host };
			const req = { url: `http://${host}/test/url`, headers };
			await hook.request.before({ req });
			expect(req.headers).toEqual(
				expectedCookie
					? {
							host,
							cookie: expectedCookie,
							'user-agent': 'test-agent',
							'mconfig-info': 'test-config',
						}
					: { host }
			);
		}
	} finally {
		jest.restoreAllMocks();
	}
});

test.each([false, 'false', undefined])(
	'radio fallback skips like=%s',
	async (like) => {
		const body = { code: 512 };
		const netease = {
			path: '/api/radio/like',
			param: { trackId: 42, like },
		};
		await expect(response(netease, body)).resolves.toEqual(body);
		expect(request).not.toHaveBeenCalled();
	}
);

test('radio fallback adds a track when like is explicitly requested', async () => {
	for (const body of [
		{ userPoint: { userId: 1 } },
		{ playlist: [{ id: 2 }] },
		{ code: 200 },
	]) {
		request.mockResolvedValueOnce({ json: async () => body });
	}
	const netease = {
		path: '/api/radio/like',
		param: { trackId: 42, like: 'true' },
	};
	await expect(response(netease, { code: 401 })).resolves.toEqual({
		code: 200,
		playlistId: 2,
	});
	expect(request.mock.calls[2][3]).toBe('trackIds=[42,42]&pid=2&op=add');
});

test.each([
	['player', -460],
	['download', -462],
])('%s replaces a refused response only on success', async (type, code) => {
	const netease = {
		path: `/api/song/enhance/${type}/url/v1`,
		crypto: 'xeapi',
		e_r: true,
		param: { id: '42' },
	};
	const refused = { code, data: null, message: 'refused' };
	match.mockRejectedValueOnce().mockResolvedValueOnce(track);
	await expect(response(netease, refused)).resolves.toEqual(refused);
	const patched = await response(netease, refused);
	const item = { id: 42, code: 200, url: track.url, time: track.duration };
	expect(patched).toMatchObject({
		code: 200,
		data: type === 'download' ? item : [item],
	});
	expect(patched).not.toHaveProperty('message');
});

test('a Web response entry without an ID leaves later entries eligible', async () => {
	match.mockResolvedValueOnce(track);
	const netease = { path: '/api/song/enhance/player/url/v1', web: true };
	const patched = await response(netease, {
		code: 200,
		data: [
			{ code: 200, url: null },
			{ id: 42, code: 404 },
		],
	});
	expect(match.mock.calls).toEqual([[42]]);
	expect(patched.data[1].url).toBe(track.url);
});
