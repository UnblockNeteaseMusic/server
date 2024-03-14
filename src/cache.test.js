const {
	CacheStorage,
} = require('./cache');

describe('CacheStorage', () => {
	describe('CacheStorage#constructor', () => {
		it('constructor() without the parameter "id" should work properly', () => {
			const cs = new CacheStorage();
			expect(cs.id).toBe('default');
		});

		it('constructor() with the parameter "id" should work properly', () => {
			const cs = new CacheStorage('JestTest');
			expect(cs.id).toBe('JestTest');
		});
	});

	describe('CacheStorage#cache', () => {
		it('cache() can correctly place the cache', async () => {
			const cs = new CacheStorage();
			const mockFunc = jest
				.fn()
				.mockReturnValue(Promise.resolve().then(() => '12345'));

			await cs.cache('owo', mockFunc);

			expect(mockFunc).toBeCalledTimes(1);
			expect(cs.getData('owo')).toBe('12345');
		});

		it('cache() can correctly reuse the cache', async () => {
			const cs = new CacheStorage();
			const mockFunc = jest
				.fn()
				.mockReturnValue(Promise.resolve().then(() => '12345'));

			for (let i = 0; i < 5; i++) await cs.cache('owo', mockFunc);

			expect(mockFunc).toBeCalledTimes(1);
			expect(cs.getData('owo')).toBe('12345');
		});

		it('cache() (once) should return the execution result', async () => {
			const cs = new CacheStorage();
			const mockFunc = () => Promise.resolve().then(() => '12345');

			expect(await cs.cache('owo', mockFunc)).toBe('12345');
		});

		it('cache() (twice) should return the execution result', async () => {
			const cs = new CacheStorage();
			const mockFunc = () => Promise.resolve().then(() => '12345');

			await cs.cache('owo', mockFunc);

			expect(await cs.cache('owo', mockFunc)).toBe('12345');
		});
	});
});
