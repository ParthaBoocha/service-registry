// set up winston
var winston = require('winston');
var logger = new winston.Logger();

let commonOptions = {
  timestamp: true,
  colorize: true,
  handleExceptions: true,
  humanReadableUnhandledException: true
};

logger.add(winston.transports.Console, {
  ...commonOptions,
  depth: 2,
  prettyPrint: true,
  level: 'silly'
});

console.info = function() {
  logger.info.apply(logger, arguments);
};
console.warn = function() {
  logger.warn.apply(logger, arguments);
};
console.error = function() {
  logger.error.apply(logger, arguments);
};
console.debug = function() {
  logger.verbose.apply(logger, arguments);
};

process.on('unhandledRejection', (reason, promise) => {
  logger.error('UNHANDLED_PROMISE_REJECTION', reason);
});
