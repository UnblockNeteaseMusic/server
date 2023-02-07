const pino = require('pino');

// The destination of the log file. Can be `undefined`.
const destFile = process.env.LOG_FILE;

// Do not colorize if printing to non-TTY deivce.
const colorize = process.stdout.isTTY;
const messageFormat = colorize
	? '\x1b[1m\x1b[32m({scope})\x1b[0m\x1b[36m {msg}'
	: '({scope}) {msg}';

const prettyPrintTransport = {
	target: 'pino-pretty',
	options: {
		destination: 1, // use 2 for stderr
		colorize,
		messageFormat: messageFormat,
		ignore: 'time,pid,hostname,scope',
		errorProps: '*',
	},
};

const fileTransport = destFile
	? {
		target: 'pino/file',
		options: { destination: destFile }
	}
	: null;

const transport = pino.transport({
	targets: [
		prettyPrintTransport,
		fileTransport,
	].filter(v => !!v),
});

const logger = pino(
	{
		level: process.env.LOG_LEVEL ?? 'info',
	},
	transport
);

/**
 * Add the scope of this log message.
 *
 * @param {string} scope The scope of this log message.
 * @return {pino.Logger}
 */
function logScope(scope) {
	return logger.child({
		scope,
	});
}

module.exports = {
	logger,
	logScope,
};
