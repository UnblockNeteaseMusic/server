const insure = require('./insure');
const select = require('./select');
const request = require('../request');
const { getManagedCacheStorage } = require('../cache');

const format = (song) => {
	return {
		id: song.id,
		name: song.name,
		album: song.albums && song.albums[0],
		artists: song.singers,
		resources: song.newRateFormats.map((detail) => ({
			formatType: detail.formatType,
			url: encodeURI(detail.url || detail.androidUrl),
		})),
	};
};

const search = (info) => {
	const url =
		'https://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do?' +
		'&ua=Android_migu&version=5.0.1&pageNo=1&pageSize=10&text=' +
		encodeURIComponent(info.keyword) +
		'&searchSwitch=' +
		'{"song":1,"album":0,"singer":0,"tagSong":0,"mvSong":0,"songlist":0,"bestShow":1}';

	return request('GET', url)
		.then((response) => response.json())
		.then((jsonBody) => {
			const list = ((jsonBody || {}).songResultData.result || []).map(
				format
			);
			const matched = select(list, info);
			return matched ? matched.resources : Promise.reject();
		});
};

const single = (resources, format) => {
	const song = resources.find(
		(song) => song.url && song.formatType === format
	);

	if (song) {
		const playUrl = new URL(song.url);
		playUrl.protocol = 'http';
		playUrl.hostname = 'freetyst.nf.migu.cn';
		return playUrl.href;
	} else return false;
};

const track = (resources) =>
	Promise.all(
		['ZQ', 'SQ', 'HQ', 'PQ']
			.slice(select.ENABLE_FLAC ? 0 : 2)
			.map((format) => single(resources, format))
	)
		.then((result) => result.find((url) => url) || Promise.reject())
		.catch(() => insure().migu.track(resources));

const cs = getManagedCacheStorage('provider/migu');
const check = (info) => cs.cache(info, () => search(info)).then(track);

module.exports = { check, track };
