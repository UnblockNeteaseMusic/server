const assert = require('node:assert/strict');
const { describe, test } = require('node:test');
const { CancelRequest } = require('./cancel');
const request = require('./request');
const RequestCancelled = require('./exceptions/RequestCancelled');

describe('request()', () => {
	test('will throw RequestCancelled when the CancelRequest has been cancelled', async () => {
		const cancelRequest = new CancelRequest();
		cancelRequest.cancel();

		try {
			await request(
				'GET',
				'https://www.example.com',
				undefined,
				undefined,
				undefined,
				cancelRequest
			);
		} catch (e) {
			console.log(e);
			assert.ok(e instanceof RequestCancelled);
			return;
		}

		throw new Error('It should not be fulfilled.');
	});

	test(
		'will NOT throw RequestCancelled when the CancelRequest has not been cancelled',
		{ timeout: 15000 },
		async () => {
			const cancelRequest = new CancelRequest();

			return request(
				'GET',
				'https://www.example.com',
				undefined,
				undefined,
				undefined,
				cancelRequest
			);
		}
	);

	test('headers should be in the response', { timeout: 15000 }, async () => {
		const response = await request('GET', 'https://www.example.com');

		assert.notStrictEqual(response.headers, undefined);
	});

	test(
		'.body(raw: false) should returns the string',
		{ timeout: 15000 },
		async () => {
			const response = await request('GET', 'https://www.example.com');
			const body = await response.body(false);

			assert.ok(typeof body === 'string');
		}
	);

	test(
		'.body(raw: true) should returns the Buffer',
		{ timeout: 15000 },
		async () => {
			const response = await request('GET', 'https://www.example.com');
			const body = await response.body(true);

			assert.ok(body instanceof Buffer);
		}
	);

	// FIXME: re-enable after api.opensource.org becomes online
	//
	// test('.json() should returns the deserialized data', async () => {
	// 	const response = await request(
	// 		'GET',
	// 		'https://api.opensource.org/licenses/'
	// 	);
	// 	const body = await response.json();

	// 	expect(Array.isArray(body)).toBeTruthy();
	// }, 15000);

	// test('.url should be the request URL', async () => {
	// 	const response = await request(
	// 		'GET',
	// 		'https://api.opensource.org/licenses/'
	// 	);

	// 	expect(response.url).toStrictEqual(
	// 		url.parse('https://api.opensource.org/licenses/')
	// 	);
	// }, 15000);
});
