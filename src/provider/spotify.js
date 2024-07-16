const insure = require('./insure');
const select = require('./select');
const request = require('../request');
const { getManagedCacheStorage } = require('../cache');


const format = (song) => ({
	id: song.id,
	name: song.name,
	// duration: song.interval * 1000,
	// album: { id: song.album.mid, name: song.album.name },
	// artists: song.singer.map(({ mid, name }) => ({ id: mid, name })),
});

const search = (info) => {
	const url =
		'https://music-api.gdstudio.xyz/api.php?types=search&source=spotify&name='+encodeURIComponent(info.keyword)+'&count=5&pages=1';

	return request('GET', url)
		.then((response) => response.json())
		.then((jsonBody) => {
			const result = jsonBody.map(format);
			const matched = select(result, info);
			return matched ? matched.id : Promise.reject();
		});
};

const track = (id) => {
	// Credit: This API is provided by GD studio (music.gdstudio.xyz).
	const url =
		'https://music-api.gdstudio.xyz/api.php?types=url&source=spotify&id=' +
		id +
		'&br=' +
		['999', '320'].slice(
			select.ENABLE_FLAC ? 0 : 1,
			select.ENABLE_FLAC ? 1 : 2
		);
	return request('GET', url)
		.then((response) => response.json())
		.then((jsonBody) => {
			if (
				jsonBody &&
				typeof jsonBody === 'object' &&
				(!'url') in jsonBody
			)
				return Promise.reject();

			return jsonBody.br > 0 ? 'https://music.gdstudio.xyz/'+jsonBody.url : Promise.reject();
		});
};

const cs = getManagedCacheStorage('provider/spotify');
const check = (info) => cs.cache(info, () => search(info)).then(track);

module.exports = { check, track };
