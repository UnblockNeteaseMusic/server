const insure = require('./insure');
const select = require('./select');
const request = require('../request');
const { getManagedCacheStorage } = require('../cache');

const headers = {
	origin: 'http://www.joox.com',
	referer: 'http://www.joox.com',
	// Refer to #95, you should register an account
	// on Joox to use their service. We allow users
	// to specify it manually.
	cookie:
		process.env.JOOX_COOKIE ||
		'wmid=142420656; user_type=1; country=hk; session_key=2a5d97d05dc8fe238150184eaf3519ad; uid=142420656; backendCountry=hk',
};

const fit = (info) => {
	if (/[\u0800-\u4e00]/.test(info.name))
		//is japanese
		return info.name;
	else return info.keyword;
};

const format = (song) => {
	return {
		id: song.id,
		name: song.name || '',
		duration: (parseInt(song.playtime) || 0) * 1000,
		album: {
			id: song.album_id,
			name: song.album_name || '',
		},
		artists: (song.artist_list || []).map(({ id, name }) => ({
			id,
			name: name || '',
		})),
	};
};

const search = (info) => {
	const keyword = fit(info);
	const url =
		'https://cache.api.joox.com/openjoox/v2/search_type?' +
		'country=hk&lang=zh_TW&key=' +
		encodeURIComponent(keyword) +
		'&type=0';

	return request('GET', url, headers)
		.then((response) => response.body())
		.then((body) => {
			const jsonBody = JSON.parse(body);
			const tracks = jsonBody.tracks || [];
			const list = tracks
				.map((track) => (Array.isArray(track) ? track[0] : track))
				.filter(Boolean)
				.map(format);
			const matched = select(list, info);
			return matched ? matched.id : Promise.reject();
		});
};

const track = (id) => {
	const url =
		'https://api.joox.com/web-fcgi-bin/web_get_songinfo?' +
		'songid=' +
		id +
		'&country=hk&lang=zh_TW&from_type=-1&channel_id=-1&_=' +
		new Date().getTime();

	return request('GET', url, headers)
		.then((response) => response.body())
		.then((body) => {
			const jsonBody = JSON.parse(
				body.replace(/^MusicInfoCallback\(/, '').replace(/\);?$/, '')
			);
			const candidateFields = [
				'master_tapeUrl',
				'master_tapeURL',
				'master_tape_url',
				'hiresUrl',
				'hiresURL',
				'hires_url',
				'flacUrl',
				'flacURL',
				'flac_url',
				'r320Url',
				'r192Url',
				'mp3Url',
				'm4aUrl',
			];

			const songUrl = candidateFields
				.map((field) => jsonBody[field])
				.find((url) => url && String(url).startsWith('http'));

			if (songUrl) return songUrl;
			else return Promise.reject();
		})
		.catch(() => insure().joox.track(id));
};

const cs = getManagedCacheStorage('provider/joox');
const check = (info) => cs.cache(info, () => search(info)).then(track);

module.exports = { check, track };
