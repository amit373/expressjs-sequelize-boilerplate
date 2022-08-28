const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    const isAction = info.action ? ` [${info.action}]` : '';
    const statusCode = info.statusCode ? ` [${info.statusCode}]` : '';
    return `${info.timestamp} [${info.level
      .toUpperCase()
      .padEnd(7)
      .trim()}]${isAction}${statusCode} ${info.message}`;
  }),
);

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs.log' }),
  ],
  format: customFormat,
  colorize: true,
});

module.exports = { logger };
