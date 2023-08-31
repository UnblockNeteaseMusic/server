const DEFAULT_SOURCE = ['kugou', 'kuwo', 'migu', 'bilibili', 'ytdlp'];
const PROVIDERS = {
	qq: require('./provider/qq'),
	kugou: require('./provider/kugou'),
	kuwo: require('./provider/kuwo'),
	migu: require('./provider/migu'),
	joox: require('./provider/joox'),
	youtube: require('./provider/youtube'),
	youtubedl: require('./provider/youtube-dl'),
	ytdlp: require('./provider/yt-dlp'),
	bilibili: require('./provider/bilibili'),
	pyncmd: require('./provider/pyncmd'),
};

module.exports = {
	DEFAULT_SOURCE,
	PROVIDERS,
};
