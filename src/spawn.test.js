const assert = require('node:assert/strict');
const { describe, it } = require('node:test');
const { spawnStdout } = require('./spawn');
const ProcessExitNotSuccessfully = require('./exceptions/ProcessExitNotSuccessfully');

describe('spawnStdout()', () => {
	it('can correctly receive stdout', async () => {
		const { stdout } = await spawnStdout('node', ['-v']);
		// "node -v" returns the form of "v[major].[minor].[patch]"
		assert.strictEqual(stdout.toString('utf-8')[0], 'v');
	});

	// TODO: can correctly receive stderr

	it("throws when the process doesn't exit successfully", async () => {
		try {
			await spawnStdout('node', ['NOT_EXIST.js']);
		} catch (e) {
			assert.ok(e instanceof ProcessExitNotSuccessfully);
		}
	});

	it("throws when the process doesn't exist", async () => {
		try {
			await spawnStdout('THIS_COMMAND_SHOULD_NOT_BE_EXISTANCE_5ca1facd');
		} catch (e) {
			assert.notStrictEqual(e, undefined);
			assert.strictEqual(e.code, 'ENOENT');
		}
	});

	it("throws when we don't have the permission to execute this command", async () => {
		try {
			await spawnStdout(__dirname + '/testdata/test.sh');
		} catch (e) {
			assert.notStrictEqual(e, undefined);
			assert.strictEqual(e.code, 'EACCES');
		}
	});
});
