/**
 * Does the hostname of `URL` equal `host`?
 *
 * @param url {string}
 * @param host {string}
 * @return {boolean}
 */
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
 * @returns {MusicUriRecord | null}
 */
const getConfigData = async () => {
	try {
		const fileName = process.env.MUSIC_FILE || 'musicExample.json';
		const filePath = path.join(__dirname, '.', fileName);
		const musicDataRaw = await fs.promises.readFile(filePath);
		return JSON.parse(musicDataRaw);
	} catch (error) {
		logger.warn('Unable to load the musicExample data. Ignoring.', error.message);
	}
	return null;
};

/**
 * The singleton music configuration data.
 *
 * If no `musicExample.json` found or invalid, it will be `{}`.
 */
const musicConfigData = getConfigData() || {};

/**
 * Try to get the matched data from {@link musicConfigData}.
 *
 * @param {string} source
 * @param {string} songId
 * @returns {MusicReplaceRecordEntryField | null}
 */
const tryGetMatchedData = (source, songId) => {
	let matchedSongData = musicConfigData?.[source]?.[songId];

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
const tryGetSelectSource = (songId) => {
	let source = musicConfigData.source?.[songId];
	if (source) {
		logger.info(`${songId} selected source (${source})`);
	}
	return source ? [source] : null;
};

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
