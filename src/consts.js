const DEFAULT_SOURCE = ['kugou', 'kuwo', 'migu', 'youtube'];
const PROVIDERS = {
	netease: require('./provider/netease'),
	qq: require('./provider/qq'),
	baidu: require('./provider/baidu'),
	kugou: require('./provider/kugou'),
	kuwo: require('./provider/kuwo'),
	migu: require('./provider/migu'),
	joox: require('./provider/joox'),
	youtube: require('./provider/youtube'),
	ytdownload: require('./provider/yt-download'),
	bilibili: require('./provider/bilibili'),
	pyncmd: require('./provider/pyncmd'),
};

module.exports = {
	DEFAULT_SOURCE,
	PROVIDERS,
};
