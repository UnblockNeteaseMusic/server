module.exports = (list, info) => {
	const { duration, album } = info;
	const sliceList = list.slice(0, 5);	// 挑前5个结果
	let song = sliceList
		.find(
			(s) =>
				s.album?.name && s.album.name == album.name
		); // 第一个专辑名称一样的
	if (song) return song;
	song = sliceList
		.find(
			(s) =>
				s.duration && Math.abs(s.duration - duration) < 5 * 1e3
		); // 第一个时长相差5s (5000ms) 之内的结果
	if (song) return song;
	else return list[0]; // 没有就播放第一条
};

module.exports.ENABLE_FLAC =
	(process.env.ENABLE_FLAC || '').toLowerCase() === 'true';
