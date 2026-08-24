const request = require('../request');
const { getManagedCacheStorage } = require('../cache');
const { logScope } = require('../logger');

const logger = logScope('provider/find');

const filter = (object, keys) =>
	Object.keys(object).reduce(
		(result, key) =>
			Object.assign(result, keys.includes(key) && { [key]: object[key] }),
		{}
	);
// Object.keys(object).filter(key => !keys.includes(key)).forEach(key => delete object[key])

const limit = (text) => {
	const output = [text[0]];
	const length = () => output.reduce((sum, token) => sum + token.length, 0);
	text.slice(1).some((token) => {
		if (length() > 15) return true;

		output.push(token);
		return false;
	});
	return output;
};

const getFormatData = (data) => {
	try {
		const info = filter(data, ['id', 'name']);
		// `/api/v3/song/detail` renames most of what the legacy endpoint
		// returned: `ar`, `al`, `dt` and `alia` instead of `artists`, `album`,
		// `duration` and `alias`. Accept either shape.
		info.alias = data.alias || data.alia || [];
		info.duration = data.duration ?? data.dt;
		info.name = (info.name || '')
			.replace(/（\s*cover[:：\s][^）]+）/i, '')
			.replace(/\(\s*cover[:：\s][^)]+\)/i, '')
			.replace(/（\s*翻自[:：\s][^）]+）/, '')
			.replace(/\(\s*翻自[:：\s][^)]+\)/, '');
		info.album = filter(data.album || data.al || {}, ['id', 'name']);
		info.artists = (data.artists || data.ar || []).map((artist) =>
			filter(artist, ['id', 'name'])
		);
		info.keyword =
			info.name +
			' - ' +
			limit(info.artists.map((artist) => artist.name)).join(' / ');
		if (process.env.SEARCH_ALBUM === 'true') {
			let album = info.album?.name;
			if (album && album !== info.name) {
				info.keyword += ` ${album}`;
			}
		}
		return info;
	} catch (err) {
		console.log('getFormatData err: ', err);
		return {};
	}
};

/**
 * Ask Netease Music what a song is. `/api/v3/song/detail` is what the current
 * client uses; the long-standing `/api/song/detail` is kept as a fallback for
 * when the newer one is unreachable.
 *
 * @param {string | number} id
 * @return {Promise<Record<string, unknown>>}
 */
const detail = (id) => {
	const url = 'https://music.163.com/api/v3/song/detail';
	const body =
		'c=' + encodeURIComponent(JSON.stringify([{ id: Number(id) }]));
	return request(
		'POST',
		url,
		{
			'content-type': 'application/x-www-form-urlencoded',
			referer: 'https://music.163.com',
		},
		body
	)
		.then((response) => response.json())
		.then((jsonBody) =>
			jsonBody && jsonBody.songs && jsonBody.songs.length
				? jsonBody.songs[0]
				: Promise.reject()
		)
		.catch((error) => {
			if (error)
				logger.debug(error, 'Falling back to the legacy detail.');
			return request(
				'GET',
				'https://music.163.com/api/song/detail?ids=[' + id + ']'
			)
				.then((response) => response.json())
				.then((jsonBody) =>
					jsonBody && jsonBody.songs && jsonBody.songs.length
						? jsonBody.songs[0]
						: Promise.reject()
				);
		});
};

const find = (id, data) => {
	if (data) {
		const info = getFormatData(data);
		return info.name ? Promise.resolve(info) : Promise.reject();
	} else {
		return detail(id).then((song) => {
			const info = getFormatData(song);
			return info.name ? info : Promise.reject();
		});
	}
};

const cs = getManagedCacheStorage('provider/find');

module.exports = (id, data) => {
	if (data) {
		return find(id, data);
	} else {
		return cs.cache(id, () => find(id));
	}
};
