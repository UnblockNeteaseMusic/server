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

const getConfigData = () => {
	try {
		const fileName = process.env.MUSIC_FILE || 'musicExample.json';
		const filePath = path.join(__dirname, '.', fileName);
		let musicDataRaw = fs.readFileSync(filePath);
		return JSON.parse(musicDataRaw);
	} catch (error) {
		logger.error('音源文件加载失败', error.message);
	}
	return null;
};

const musicConfigData = getConfigData() || {};

const tryGetMatchedData = (source, songId) => {
	let matchedSongData = musicConfigData?.[source]?.[songId];
	if (matchedSongData) {
		logger.info(
			matchedSongData,
			`${songId} Has the matched source (${source})`
		);
	}
	return matchedSongData;
};

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
