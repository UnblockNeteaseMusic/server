const ENABLE_WEIGHTINGSYSTEM =
	(process.env.ENABLE_WEIGHTINGSYSTEM || '').toLowerCase() === 'true';
const replaceSpace = (string) =>
	string.replace(/&nbsp;/g, ' ').replace(/nbsp;/g, ' ');

const compareTwoStrings = (first, second) => {
	first = first.replace(/\s+/g, '').toLowerCase();
	second = second.replace(/\s+/g, '').toLowerCase();

	if (first === second) return 1; // identical or empty
	if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substring(i, i + 2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	}

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substring(i, i + 2);
		const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
};

const calcWeight = (song, info) => {
	let weight = 0;
	const songName = replaceSpace(
		song.name
			.replace(/（\s*cover[:：\s][^）]+）/i, '')
			.replace(/\(\s*cover[:：\s][^)]+\)/i, '')
			.replace(/（\s*翻自[:：\s][^）]+）/, '')
			.replace(/\(\s*翻自[:：\s][^)]+\)/, '')
	);
	const similarityValue = compareTwoStrings(songName, info.name);
	if (similarityValue === 0) return 0; //歌曲名不相似绝对不一样
	if (similarityValue === 1) weight = 0.15;
	else weight = similarityValue / 4;

	if (song.artists) {
		let authorName = '';
		if (Array.isArray(song.artists)) {
			song.artists.forEach((artists) => {
				authorName += replaceSpace(artists.name);
			});
		} else {
			authorName = replaceSpace(song.artists.name);
		}
		const songName = song.name ? song.name : '';
		info.artists.forEach((artists) => {
			const originalName = artists.name;
			if (authorName.includes(originalName)) weight += 0.1;
			else if (songName.includes(originalName)) weight += 0.1;
			else weight -= 0.1;
		});
	}
	if (song.duration) {
		const songLength = Math.abs(song.duration - info.duration);
		if (songLength < 3 * 1e3) weight += 0.1;
		else if (songLength < 6 * 1e3) weight += 0.06;
		else if (songLength < 9 * 1e3) weight += 0.03;
	}
	return weight.toFixed(2) * 100;
};

const selectList = (list, info) => {
	let result = list[0];
	for (let index of list) {
		index.weight = calcWeight(index, info);
		if (result.weight < index.weight) result = index;
	}
	return result;
};

module.exports = (list, info) => {
	if (ENABLE_WEIGHTINGSYSTEM) return selectList(list, info);
	else {
		const { duration } = info;
		const song = list
			.slice(0, 5) // 挑前5个结果
			.find(
				(song) =>
					song.duration &&
					Math.abs(song.duration - duration) < 5 * 1e3
			); // 第一个时长相差5s (5000ms) 之内的结果
		if (song) return song;
		else return list[0]; // 没有就播放第一条
	}
};

module.exports.ENABLE_FLAC =
	(process.env.ENABLE_FLAC || '').toLowerCase() === 'true';
module.exports.ENABLE_WEIGHTINGSYSTEM = ENABLE_WEIGHTINGSYSTEM;
