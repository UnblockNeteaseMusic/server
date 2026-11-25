const assert = require('node:assert/strict');
const { beforeEach, describe, it, mock } = require('node:test');
const {
	CacheStorage,
	CacheStorageEvents,
	CacheStorageGroup,
} = require('./cache');

describe('CacheStorage', () => {
	describe('CacheStorage#constructor', () => {
		it('constructor() without the parameter "id" should work properly', () => {
			const cs = new CacheStorage();
			assert.strictEqual(cs.id, 'Default Cache Storage');
		});

		it('constructor() with the parameter "id" should work properly', () => {
			const cs = new CacheStorage('JestTest');
			assert.strictEqual(cs.id, 'JestTest');
		});
	});

	describe('CacheStorage#removeExpiredCache', () => {
		it('removeExpiredCache() can remove the expired entries in the CacheStorage', () => {
			const cs = new CacheStorage();
			cs.cacheMap.set('JestExpireTest', {
				data: 'hi',
				expireAt: Date.now() - 100000,
			});

			cs.removeExpiredCache();
			assert.strictEqual(cs.cacheMap.size, 0);
			assert.strictEqual(cs.cacheMap.get('JestExpireTest'), undefined);
		});

		it('removeExpiredCache() will not remove the alive entries in the CacheStorage', () => {
			const cs = new CacheStorage();
			const aliveTestObject = {
				data: 'hi2',
				expireAt: Date.now() + 10e10,
			};

			cs.cacheMap.set('JestExpireTest', {
				data: 'hi',
				expireAt: Date.now() - 100000,
			});
			cs.cacheMap.set('JestAliveTest', aliveTestObject);

			cs.removeExpiredCache();
			assert.strictEqual(cs.cacheMap.size, 1);
			assert.strictEqual(cs.cacheMap.get('JestExpireTest'), undefined);
			assert.deepStrictEqual(
				cs.cacheMap.get('JestAliveTest'),
				aliveTestObject
			);
		});

		it('removeExpiredCache() can be called with CLEANUP (cs@cleanup) event.', async () => {
			const cs = new CacheStorage();
			const cleaned = new Promise((resolve) =>
				cs.on(CacheStorageEvents.CLEANUP, resolve)
			);
			cs.removeExpiredCache = mock.fn();

			cs.emit(CacheStorageEvents.CLEANUP);
			await cleaned;

			assert.strictEqual(cs.removeExpiredCache.mock.callCount(), 1);
		});
	});

	describe('CacheStorage#cache', () => {
		it('cache() can correctly place the cache', async () => {
			const cs = new CacheStorage();
			const mockFunc = mock.fn(() => Promise.resolve('12345'));

			await cs.cache('owo', mockFunc);

			assert.strictEqual(mockFunc.mock.callCount(), 1);
			assert.strictEqual(cs.cacheMap.size, 1);
			assert.notStrictEqual(cs.cacheMap.get('owo'), undefined);
			assert.strictEqual(cs.cacheMap.get('owo').data, '12345');
		});

		it('cache() can correctly reuse the cache', async () => {
			const cs = new CacheStorage();
			const mockFunc = mock.fn(() => Promise.resolve('12345'));

			for (let i = 0; i < 5; i++) await cs.cache('owo', mockFunc);

			assert.strictEqual(mockFunc.mock.callCount(), 1);
			assert.strictEqual(cs.cacheMap.size, 1);
			assert.notStrictEqual(cs.cacheMap.get('owo'), undefined);
			assert.strictEqual(cs.cacheMap.get('owo').data, '12345');
		});

		it('cache() (once) should return the execution result', async () => {
			const cs = new CacheStorage();
			const mockFunc = () => Promise.resolve().then(() => '12345');

			assert.strictEqual(await cs.cache('owo', mockFunc), '12345');
		});

		it('cache() (twice) should return the execution result', async () => {
			const cs = new CacheStorage();
			const mockFunc = () => Promise.resolve().then(() => '12345');

			await cs.cache('owo', mockFunc);

			assert.strictEqual(await cs.cache('owo', mockFunc), '12345');
		});

		it('cache() can trigger removeExpiredCache()', async () => {
			const cs = new CacheStorage();
			const mockFunc = mock.fn(() => Promise.resolve('12345'));
			const cleaned = new Promise((resolve) =>
				cs.on(CacheStorageEvents.CLEANUP, resolve)
			);
			cs.removeExpiredCache = mock.fn();

			cs.cache('owo', mockFunc);
			await cleaned;

			assert.strictEqual(cs.removeExpiredCache.mock.callCount(), 1);
		});
	});
});

describe('CacheStorageGroup', () => {
	const instance = CacheStorageGroup.getInstance();

	beforeEach(() => {
		// Reset the cacheStorages in CacheStorageGroup for every test.
		instance.cacheStorages.clear();
	});

	describe('CacheStorageGroup#getInstance', () => {
		it('CacheStorageGroup should be singleton', () => {
			assert.deepStrictEqual(CacheStorageGroup.getInstance(), instance);
		});
	});

	describe('CacheStorageGroup#cleanup', () => {
		it('CacheStorageGroup#cleanup should call the removeExpiredCache() in every storages registered', () => {
			const cs = new CacheStorage('JestCSGTest');
			cs.removeExpiredCache = mock.fn();

			instance.cacheStorages.add(cs);
			instance.cleanup();

			assert.strictEqual(cs.removeExpiredCache.mock.callCount(), 1);
		});
	});
});
