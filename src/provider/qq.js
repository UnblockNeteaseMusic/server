const insure = require('./insure');
const select = require('./select');
const request = require('../request');
const { getManagedCacheStorage } = require('../cache');

const headers = {
	origin: 'http://y.qq.com/',
	referer: 'http://y.qq.com/',
	cookie: process.env.QQ_COOKIE || null, // 'uin=; qm_keyst=',
};

const format = (song) => ({
	id: { song: song.mid, file: song.mid },
	name: song.name,
	duration: song.interval * 1000,
	album: { id: song.album.mid, name: song.album.name },
	artists: song.singer.map(({ mid, name }) => ({ id: mid, name })),
});

const search = (info) => {
	const url =
		'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' +
		encodeURIComponent(
			JSON.stringify({
				search: {
					method: 'DoSearchForQQMusicDesktop',
					module: 'music.search.SearchCgiService',
					param: {
						num_per_page: 5,
						page_num: 1,
						query: info.keyword,
						search_type: 0,
					},
				},
			})
		);

	return request('GET', url, headers)
		.then((response) => response.json())
		.then((jsonBody) => {
			const result = jsonBody.search.data.body.song.list.map(format);
			const matched = select(result, info);
			return matched ? matched.id : Promise.reject();
		});
};

const track = (id) => {
	const uin = ((headers.cookie || '').match(/uin=(\d+)/) || [])[1] || '0';

	const url =
		'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' +
		encodeURIComponent(
			JSON.stringify({
				req_0: {
					module: 'vkey.GetVkeyServer',
					method: 'CgiGetVkey',
					param: {
						guid: (Math.random() * 10000000).toFixed(0),
						loginflag: 1,
						songmid: [id.song],
						songtype: [0],
						uin,
						platform: '20',
					},
				},
			})
		);

	return request('GET', url, headers)
		.then((response) => response.json())
		.then((jsonBody) => {
			const { sip, midurlinfo } = jsonBody.req_0.data;
			return midurlinfo[0].purl
				? sip[0] + midurlinfo[0].purl
				: Promise.reject();
		})
		.catch(() => insure().qq.track(id));
};

const cs = getManagedCacheStorage('provider/qq');
const check = (info) => cs.cache(info, () => search(info)).then(track);

module.exports = { check, track };
