const pino = require('pino');
const pretty = require('pino-pretty');

const destination = process.env.LOG_FILE || 1;

const stream =
	process.env.JSON_LOG === 'true'
		? pino.destination({ dest: destination, sync: true })
		: pretty({
				destination,
				sync: true,
				colorize: Boolean(process.stdout.isTTY),
				messageFormat: '({scope}) {msg}',
				ignore: 'time,pid,hostname,scope',
				errorProps: '*',
			});

const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' }, stream);

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
