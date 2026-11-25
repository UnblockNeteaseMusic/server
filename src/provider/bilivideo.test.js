const assert = require('node:assert/strict');
const {
	after,
	before,
	beforeEach,
	describe,
	mock,
	test,
} = require('node:test');
const match = require('./match');

const songList = [
	520521849, // Remix; https://music.163.com/song/520521849
	185811, // 周杰倫; https://music.163.com/song/185811
	33955999, // ACG; https://music.163.com/song/33955999
	515540639, // TheFatRat; https://music.163.com/song/515540639
	33190502, // ACG; http://music.163.com/song/33190502
];

// These tests call Bilibili's real API, which refuses requests from the addresses of CI
// runners. Run them from a normal network with `yarn test:live`.

describe(
	'Test if the default sources can get any song',
	{ skip: !process.env.LIVE_SOURCE_TESTS },
	() => {
		songList.map((song) =>
			test(
				`finding: ${song}`,
				{ timeout: 15000 }, // can wait for only 15s
				async () => match(song, ['bilivideo'])
			)
		);
	}
);

/* FOR DEVS: Uncomment these if you want to test all the sources */
// const sources = Object.keys(PROVIDERS);
//
// /**
//  * Check if the specified song existed in the specified source.
//  * @param source {string}
//  * @param song {number}
//  * @return {Promise<void>}
//  */
// const isSongExistedInSource = async (source, song) => {
// 	const response = await match(song, [source]);
// 	if (!response || !response.url)
// 		throw new Error(`${song} is not in ${source}`);
// };
//
//
// sources.forEach((source) => {
// 	test(`Test if ${source} can get any song`, async (done) => {
// 		return Promise.any(
// 			songList.map(async (song) => isSongExistedInSource(source, song))
// 		);
// 	}, 30000); // can wait for 30s
// });

describe('Bilibili response handling', () => {
	let request;
	let bilivideo;

	const response = (jsonBody, headers = {}) => ({
		headers,
		json: async () => jsonBody,
	});

	const wbiResponse = () =>
		response({
			code: 0,
			data: {
				wbi_img: {
					img_url: `https://i0.hdslb.com/bfs/wbi/${'a'.repeat(64)}.png`,
					sub_url: `https://i0.hdslb.com/bfs/wbi/${'b'.repeat(64)}.png`,
				},
			},
		});

	before(() => {
		// Load a second provider instance with request mocked. The live-song
		// tests above keep the real request function captured by match().
		const requestId = require.resolve('../request');
		request = mock.fn();
		require.cache[requestId] = {
			id: requestId,
			filename: requestId,
			loaded: true,
			exports: request,
		};
		delete require.cache[require.resolve('./bilivideo')];
		bilivideo = require('./bilivideo');
	});

	beforeEach(() => {
		request.mock.resetCalls();
		process.env.NO_CACHE = 'true';
	});

	after(() => {
		delete process.env.NO_CACHE;
		delete require.cache[require.resolve('../request')];
	});

	test('returns an audio URL from a valid Bilibili response', async () => {
		request.mock.mockImplementation((method, url) => {
			if (url === 'https://www.bilibili.com') {
				return Promise.resolve(
					response({}, { 'set-cookie': ['buvid3=test; Path=/'] })
				);
			}
			if (url.endsWith('/x/web-interface/nav')) {
				return Promise.resolve(wbiResponse());
			}
			if (url.includes('/x/web-interface/wbi/search/type?')) {
				return Promise.resolve(
					response({
						code: 0,
						data: {
							result: [
								{
									bvid: 'BV1test',
									title: 'Test Song',
									typeid: 3,
									typename: 'Music',
								},
							],
						},
					})
				);
			}
			if (url.includes('/x/web-interface/wbi/view?')) {
				return Promise.resolve(
					response({ code: 0, data: { cid: 123 } })
				);
			}
			if (url.includes('/x/player/wbi/playurl?')) {
				return Promise.resolve(
					response({
						code: 0,
						data: {
							dash: {
								audio: [
									{
										base_url:
											'https://example.com/audio.m4s',
									},
								],
							},
						},
					})
				);
			}
			return Promise.reject(new Error(`Unexpected request: ${url}`));
		});

		assert.strictEqual(
			await bilivideo.check({ keyword: 'Test Song', duration: 180000 }),
			'https://example.com/audio.m4s'
		);
	});

	test('rejects cleanly when Bilibili omits the search result', async () => {
		request.mock.mockImplementation((method, url) => {
			if (url === 'https://www.bilibili.com') {
				return Promise.resolve(response({}, {}));
			}
			if (url.endsWith('/x/web-interface/nav')) {
				return Promise.resolve(wbiResponse());
			}
			if (url.includes('/x/web-interface/wbi/search/type?')) {
				return Promise.resolve(
					response({ code: -412, message: 'request was blocked' })
				);
			}
			return Promise.reject(new Error(`Unexpected request: ${url}`));
		});

		await assert.rejects(
			bilivideo.check({ keyword: 'Blocked Song', duration: 180000 }),
			(error) => error === undefined
		);
	});

	test('uses a backup audio URL when base_url is absent', async () => {
		request.mock.mockImplementation((method, url) => {
			if (url.endsWith('/x/web-interface/nav')) {
				return Promise.resolve(wbiResponse());
			}
			if (url.includes('/x/web-interface/wbi/view?')) {
				return Promise.resolve(
					response({ code: 0, data: { cid: 123 } })
				);
			}
			if (url.includes('/x/player/wbi/playurl?')) {
				return Promise.resolve(
					response({
						code: 0,
						data: {
							dash: {
								audio: [
									{
										backup_url: [
											'https://example.com/backup.m4s',
										],
									},
								],
							},
						},
					})
				);
			}
			return Promise.reject(new Error(`Unexpected request: ${url}`));
		});

		assert.strictEqual(
			await bilivideo.track('BV1test'),
			'https://example.com/backup.m4s'
		);
	});
});
