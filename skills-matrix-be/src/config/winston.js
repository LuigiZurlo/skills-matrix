const appRoot = require('app-root-path');
const winston = require('winston');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp, label, printf} = format;


const myFormat = printf(({level, message, label, timestamp}) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    format: combine(
      winston.format.colorize(),
      label({label: 'Logger:'}),
      timestamp(),
      myFormat,
      winston.format.json(),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: combine(
      winston.format.colorize(),
      label({label: 'Logger:'}),
      timestamp(),
      myFormat
      ),
  },
};

const logger = winston.createLogger({
  transports: [new winston.transports.Console(options.console),
    new winston.transports.File(options.file),],
  exitOnError: false,
});
logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};
module.exports = logger;
