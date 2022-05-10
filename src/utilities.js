// @ts-check

const fs = require('fs');
const path = require('path');
const { logScope } = require('./logger');
const logger = logScope('utilities');

/**
 * @typedef {{ source: Record<string, string> }} MusicReplaceRecordSource
 * @typedef {Record<string, unknown>} MusicReplaceRecordEntryField
 * @typedef {Record<string, MusicReplaceRecordEntryField>} MusicReplaceRecordEntry
 * @typedef {string} MusicReplaceRecordSourceId
 * @typedef {Partial<MusicReplaceRecordSource & Record<MusicReplaceRecordSourceId, MusicReplaceRecordEntry>>} MusicUriRecord
 */

/**
 * Retrieve the configuration of `musicExample.json`.
 *
 * @returns {Promise<MusicUriRecord | {}>} If no `musicExample.json` found or invalid, returns `{}`.
 */
const _readConfigData = async () => {
	try {
		const fileName = process.env.MUSIC_FILE || 'musicExample.json';
		const filePath = path.join(__dirname, '.', fileName);
		const musicDataRaw = await fs.promises.readFile(filePath);

		return JSON.parse(musicDataRaw.toString("utf-8"));
	} catch (error) {
		logger.warn('Unable to load the musicExample data. Ignoring.', error.message);
	}

	return {};
}

/**
 * The singleton music configuration data.
 *
 * If {@link getSingletonConfigData()} hasn't called, it will be `null`;
 * otherwise, it will be the value returned by {@link _readConfigData()}
 *
 * @type {MusicUriRecord | null}
 */
let _musicConfigData = null;

/**
 * Retrieve the *singleton* configuration of `musicExample.json`.
 *
 * @returns {Promise<MusicUriRecord>}
 */
const getSingletonConfigData = async () => {
	if (_musicConfigData === null) {
		_musicConfigData = await _readConfigData();
	}

	return _musicConfigData;
};

/**
 * Try to get the matched data from {@link musicConfigData}.
 *
 * @param {string} source
 * @param {string} songId
 * @returns {Promise<MusicReplaceRecordEntryField | null>}
 */
const tryGetMatchedData = async (source, songId) => {
	let matchedSongData = (await getSingletonConfigData())[source]?.[songId];

	if (matchedSongData) {
		logger.info(
			matchedSongData,
			`${songId} has the matched source (${source})`
		);
	}

	return matchedSongData;
};

/**
 * Try to get the sources which has the matched record to return.
 *
 * @param {string} songId the song ID.
 * @returns If we found a source that has the match in {@link musicConfigData},
 * we return `[source]` so `select()` return that data directly; otherwise,
 * we return `null` to make `select()` to try other sources.
 */
const tryGetSelectSource = async (songId) => {
	let source = (await getSingletonConfigData()).source?.[songId];
	if (source) {
		logger.info(`${songId} selected source (${source})`);
	}
	return source ? [source] : null;
};

/**
 * Does the hostname of `URL` equal `host`?
 *
 * @param {string} url
 * @param {string} host
 * @return {boolean}
 */
const isHost = (url, host) => {
	// FIXME: Due to #118, we can only check the url
	// 		  by .includes(). You are welcome to fix
	//        it (CWE-20).
	return url.includes(host);
};

/**
 * The wrapper of `isHost()` to simplify the code.
 *
 * @param url {string}
 * @return {(host: string) => boolean}
 * @see isHost
 */
const isHostWrapper = (url) => (host) => isHost(url, host);

module.exports = {
	isHost,
	isHostWrapper,
	tryGetSelectSource,
	tryGetMatchedData,
};
