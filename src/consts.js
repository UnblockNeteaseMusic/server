const DEFAULT_SOURCE = ['youtube', 'meting', 'tmetu'];
const PROVIDERS = {
	meting: require('./provider/meting'),
	tmetu: require('./provider/tmetu'),
	youtube: require('./provider/youtube'),
};

module.exports = {
	DEFAULT_SOURCE,
	PROVIDERS,
};
