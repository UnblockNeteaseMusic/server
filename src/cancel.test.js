const assert = require('node:assert/strict');
const { describe, test } = require('node:test');
const { CancelRequest, ON_CANCEL } = require('./cancel');

describe('CancelRequest', () => {
	test(
		"check if CancelRequest will emit 'cancel' event after .cancel() called",
		{ timeout: 100 },
		async () => {
			const cancelRequest = new CancelRequest();
			const cancelled = new Promise((resolve) =>
				cancelRequest.on(ON_CANCEL, resolve)
			);

			cancelRequest.cancel();
			await cancelled;
		}
	);

	test(
		'check if CancelRequest.cancelled == true after .cancel() called',
		{ timeout: 100 },
		() => {
			const cancelRequest = new CancelRequest();

			cancelRequest.cancel();
			assert.strictEqual(cancelRequest.cancelled, true);
		}
	);
});
