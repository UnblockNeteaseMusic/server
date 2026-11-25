const assert = require('node:assert/strict');
const { beforeEach, mock, test } = require('node:test');

// Replace these two modules before ./hook loads them.
const stub = (path, exports) => {
	const id = require.resolve(path);
	require.cache[id] = { id, filename: id, loaded: true, exports };
	return exports;
};
const match = stub('./provider/match', mock.fn());
const request = stub(
	'./request',
	Object.assign(mock.fn(), { read: mock.fn() })
);

const crypto = require('./crypto');
const hook = require('./hook');

// Set the results of the next calls of a mock, one per call, in order.
const queue = (fn, ...results) => {
	const base = fn.mock.callCount();
	results.forEach((result, i) =>
		fn.mock.mockImplementationOnce(async () => result(), base + i)
	);
};

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
	queue(request.read, () =>
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
	for (const fn of [match, request, request.read]) fn.mock.resetCalls();
});

test('limits configured Netease headers to supported Netease hosts', async () => {
	const env = process.env;
	process.env = {
		...env,
		NETEASE_COOKIE: 'MUSIC_U=test',
		NETEASE_USER_AGENT: 'test-agent',
		NETEASE_MCONFIG_INFO: 'test-config',
	};
	try {
		for (const [host, cookie, expectedCookie] of [
			['example.invalid', undefined, undefined],
			['interface.music.163.com', 'os=pc', 'os=pc; MUSIC_U=test'],
			['music.163.com', undefined, 'MUSIC_U=test'],
		]) {
			const headers = cookie ? { host, cookie } : { host };
			const req = { url: `http://${host}/test/url`, headers };
			await hook.request.before({ req });
			assert.deepEqual(
				req.headers,
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
		process.env = env;
	}
});

for (const like of [false, 'false', undefined]) {
	test(`radio fallback skips like=${like}`, async () => {
		const body = { code: 512 };
		const netease = {
			path: '/api/radio/like',
			param: { trackId: 42, like },
		};
		assert.deepEqual(await response(netease, body), body);
		assert.strictEqual(request.mock.callCount(), 0);
	});
}

test('radio fallback adds a track when like is explicitly requested', async () => {
	queue(
		request,
		...[
			{ userPoint: { userId: 1 } },
			{ playlist: [{ id: 2 }] },
			{ code: 200 },
		].map((body) => () => ({ json: async () => body }))
	);
	const netease = {
		path: '/api/radio/like',
		param: { trackId: 42, like: 'true' },
	};
	assert.deepEqual(await response(netease, { code: 401 }), {
		code: 200,
		playlistId: 2,
	});
	assert.strictEqual(
		request.mock.calls[2].arguments[3],
		'trackIds=[42,42]&pid=2&op=add'
	);
});

for (const [type, code] of [
	['player', -460],
	['download', -462],
]) {
	test(`${type} replaces a refused response only on success`, async () => {
		const netease = {
			path: `/api/song/enhance/${type}/url/v1`,
			crypto: 'xeapi',
			e_r: true,
			param: { id: '42' },
		};
		const refused = { code, data: null, message: 'refused' };
		queue(
			match,
			() => Promise.reject(),
			() => track
		);
		assert.deepEqual(await response(netease, refused), refused);
		const patched = await response(netease, refused);
		const item = {
			id: 42,
			code: 200,
			url: track.url,
			time: track.duration,
		};
		assert.partialDeepStrictEqual(patched, {
			code: 200,
			data: type === 'download' ? item : [item],
		});
		assert.ok(!('message' in patched));
	});
}

test('a Web response entry without an ID leaves later entries eligible', async () => {
	queue(match, () => track);
	const netease = { path: '/api/song/enhance/player/url/v1', web: true };
	const patched = await response(netease, {
		code: 200,
		data: [
			{ code: 200, url: null },
			{ id: 42, code: 404 },
		],
	});
	assert.deepEqual(
		match.mock.calls.map((call) => call.arguments),
		[[42]]
	);
	assert.strictEqual(patched.data[1].url, track.url);
});
