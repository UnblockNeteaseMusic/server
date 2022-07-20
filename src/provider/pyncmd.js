const select = require('./select');
const request = require('../request');
const { getManagedCacheStorage } = require('../cache');

const track = (info) => {
	const url =
		'https://pyncmd.vercel.app/api/pyncm?module=track&method=GetTrackAudio&song_ids=' +
		info.id +
		'&bitrate=' +
		['999000', '320000'].slice(
			select.ENABLE_FLAC ? 0 : 1,
			select.ENABLE_FLAC ? 1 : 2
		);
	return request('GET', url)
		.then((response) => response.json())
		.then((jsonBody) => {
			if (
				jsonBody &&
				typeof jsonBody === 'object' &&
				'code' in jsonBody &&
				jsonBody.code !== 200
			)
				return Promise.reject();

			const matched = jsonBody.data.find((song) => song.id === info.id);
			if (matched && matched.url) return matched.url;

			return Promise.reject();
		});
};

const cs = getManagedCacheStorage('provider/pyncmd');
const check = (info) => cs.cache(info, () => track(info));

module.exports = { check };
