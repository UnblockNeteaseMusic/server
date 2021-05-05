module.exports = (list, info) => {
	const song = list[0]
	var judge = false
	if(info.artists && song.artists.name)
	{
		const authorname = song.artists.name
		info.artists.forEach(artists => 
		{
		if(!authorname.includes(artists.name))
		    judge = true
		});
		if(judge)
			return '' // 作者名字不相似就使用下一个音源的结果
	}
	if(song.duration)
	{
	    if(Math.abs(song.duration - info.duration) < 3 * 1e3)
			return song // 时长相差3s (3000ms) 之内的结果
	    else 
			return '' // 不符合就使用下一个音源的结果
	}
	return song
}

module.exports.ENABLE_FLAC = (process.env.ENABLE_FLAC || '').toLowerCase() === 'true'