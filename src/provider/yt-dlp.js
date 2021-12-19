const { getManagedCacheStorage } = require('../cache');
const { logScope } = require('../logger');
const { spawnStdout } = require('../spawn');
const YtDlpInvalidResponse = require('../exceptions/YtDlpInvaildResponse');
const YtDlpNotInstalled = require('../exceptions/YtDlpNotInstalled');

/**
 * The arguments to pass to yt-dlp
 *
 * ```plain
 * yt-dlp -f bestaudio --dump-json <query>
 *		-f bestaudio 	choose the best quality of the audio
 *		--dump-json		dump the information as JSON without downloading it
 * ```
 *
 * @param {string} query
 */
const dlArguments = (query) => ['-f', '140', '--dump-json', query];
/** @param {string} id */
const byId = (id) => `https://www.youtube.com/watch?v=${id}`;
/** @param {string} keyword */
const byKeyword = (keyword) => `ytsearch1:${keyword}`;
const logger = logScope('provider/yt-dlp');

/**
 * Checking if yt-dlp is available,
 * then execute the command and extract the ID and URL.
 *
 * @param {string[]} args
 * @returns {Promise<{id: string, url: string}>}
 */
async function getUrl(args) {
	try {
		const { stdout } = await spawnStdout('yt-dlp', args);
		const response = JSON.parse(stdout.toString());
		if (
			typeof response === 'object' &&
			typeof response.id === 'string' &&
			typeof response.url === 'string'
		)
			return response;

		throw new YtDlpInvalidResponse(response);
	} catch (e) {
		if (e && e.code === 'ENOENT') throw new YtDlpNotInstalled();
		throw e;
	}
}

const search = async (info) => {
	const { id } = await getUrl(dlArguments(byKeyword(info.keyword)));
	return id;
};

const track = async (id) => {
	const { url } = await getUrl(dlArguments(byId(id)));
	return url;
};

const cs = getManagedCacheStorage('yt-dlp');
const check = (info) =>
	cs
		.cache(info, () => search(info))
		.then(track)
		.catch((e) => {
			if (e) logger.error(e);
			throw e;
		});

module.exports = { check, track };
