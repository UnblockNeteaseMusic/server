const insure = require('./insure');
const select = require('./select');
const crypto = require('../crypto');
const request = require('../request');
const { getManagedCacheStorage } = require('../cache');

const format = (song) => {
	return {
		// id: song.FileHash,
		// name: song.SongName,
		// duration: song.Duration * 1000,
		// album: {id: song.AlbumID, name: song.AlbumName},
		// artists: song.SingerId.map((id, index) => ({id, name: SingerName[index]}))
		id: song['hash'],
		id_hq: song['320hash'],
		id_sq: song['sqhash'],
		name: song['songname'],
		duration: song['duration'] * 1000,
		album: { id: song['album_id'], name: song['album_name'] },
	};
};

const search = (info) => {
	const url =
		// 'http://songsearch.kugou.com/song_search_v2?' +
		'http://mobilecdn.kugou.com/api/v3/search/song?' +
		'keyword=' +
		encodeURIComponent(info.keyword) +
		'&page=1&pagesize=10';

	return request('GET', url)
		.then((response) => response.json())
		.then((jsonBody) => {
			// const list = jsonBody.data.lists.map(format)
			const list = jsonBody.data.info.map(song => song.group.map(format)).flat();
			const matched = select(list, info);
			return matched ? matched : Promise.reject();
		})
		.catch(() => insure().kugou.search(info));
};

const single = (song) => {
	const url =
		'https://wwwapi.kugou.com/yy/index.php?r=play/getdata&' +
		'hash=' +
		song.id +
		'&' +
		'dfid=2mSZvv2GejpK2VDsgh0K7U0O&mid=c18aeb062e34929c6e90e3af8f7e2512&platid=4&_=1653050047389&album_id=' +
		song.album.id;
	return request('GET', url)
		.then((response) => response.json())
		.then((jsonBody) => {
                        return jsonBody.data.play_url || Promise.reject();
                    })
};

const track = (song) =>
                single(song)
		.then(resp => resp || Promise.reject())
		.catch(() => insure().kugou.track(song));

const cs = getManagedCacheStorage('provider/kugou');
const check = (info) => cs.cache(info, () => search(info)).then(track);

module.exports = { check, search };
