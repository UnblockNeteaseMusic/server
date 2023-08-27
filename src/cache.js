//@ts-check

const { logScope } = require('./logger');
const { LRUCache } = require('lru-cache');

const logger = logScope('cache');

/**
 * @typedef {{ max?: number, ttl?: number, updateAgeOnGet?: boolean }} Options
 */

/**
 * A cache storage for storing any type of data.
 */
class CacheStorage {
	/**
	 * @type {string}
	 */
	id = 'default';

	/**
	 * The inner cache data structure.
	 *
	 * @type {LRUCache<string, any>}
	 */
	#lru;


	/**
	 * The default options for this cache storage.
	 *
	 * @readonly
	 */
	static #defaultOptions = {
		max: 100,
		ttl: 60*60*1000, // expire after 1 hour

		updateAgeOnGet: true,
	};

	/**
	 * Construct a cache storage.
	 *
	 * @param {string?} id The ID of this cache storage.
	 * @param {Options} options Custom options.
	 */
	constructor(id, options) {
		// Set the ID of this cache storage.
		if (id) this.id = id;

		this.#lru = new LRUCache({
			...CacheStorage.#defaultOptions,
			...options,
		})
	}

	/**
	 * getData just retrieve the data from the cache.
	 *
	 * It will not update the age of the cache. Only
	 * for test purpose.
	 *
	 * @param {string} key
	 * @returns {any}
	 */
	getData(key) {
		return this.#lru.get(key, {
			updateAgeOnGet: false,
		});
	}

	/**
	 * Cache the response.
	 *
	 * @template T
	 * @param {string?} key the unique key of action to be cached.
	 * @param {() => Promise<T>} action the action to do and be cached.
	 * @return {Promise<T | null>}
	 */
	async cache(key, action) {
		// Disable the cache when the NO_CACHE = true.
		if (process.env.NO_CACHE === 'true') {
			return action();
		}

		// If key is null or undefined, ignore it.
		if (key == null) {
			return null;
		}

		const cached = this.#lru.get(key);
		if (cached) {
			return cached;
		}

		// Cache the response of action() and
		// register into our cache map.
		logger.debug(
			`${key} did not hit. Storing the execution result...`
		);

		const response = await action();
		this.#lru.set(key, response);

		return response;
	}
}

/**
 * A map of tracked CacheStorage.
 *
 * @type {Map<string, CacheStorage>}
 */
const trackedCacheStorages = new Map();

/**
 * Get the managed CacheStorage.
 *
 * “Managed” means that this CacheStorage
 * has been tracked. The returned CacheStorage
 * is a singleton.
 *
 * @param {string} id
 * @param {Options} options
 * @return {CacheStorage}
 */
function getManagedCacheStorage(id, options) {
	const s = trackedCacheStorages.get(id);
	if (s) return s;

	const newS = new CacheStorage(id, options);
	trackedCacheStorages.set(id, newS);
	return newS;
}

module.exports = {
	CacheStorage,
	getManagedCacheStorage,
};
