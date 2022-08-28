const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const compression = require('compression');
const xss = require('x-xss-protection');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
require('colors');

const { logger, swaggerDocument } = require('./shared');
const { NotFoundException } = require('./errors');
const { errorHandler } = require('./middleware');
const { baseUrl, corsUrl } = require('./config');

// Routes
const { restRouter } = require('./routes');
const { ErrorMessage, HttpStatus, Routes } = require('./constants');

process.on('uncaughtException', (err) => {
  console.log(ErrorMessage.UNCAUGHT_EXCEPTION.red.underline.bold);
  logger.error(`UNCAUGHT EXCEPTION! ${err?.name}: ${err?.message}`, () =>
    process.exit(1),
  );
});

const app = express();

// Enable CORS
app.use(cors({ origin: corsUrl }));

// Swagger route
app.use(
  '/api-docs',
  (req, _, next) => {
    swaggerDocument.host = req.get('host');
    swaggerDocument.basePath = baseUrl;
    req.swaggerDoc = swaggerDocument;
    next();
  },
  swaggerUi.serve,
  swaggerUi.setup(),
);

// compression
app.use(compression());

// Body parser
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false }));

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Root Route
app.get(`${baseUrl}${Routes.HEALTH}`, (req, res) => {
  logger.info(
    `${HttpStatus.OK} - ${ErrorMessage.SERVER_HEALTH} - ${req.originalUrl} [${req.method}]`,
  );
  return res
    .status(HttpStatus.OK)
    .json({ statusCode: HttpStatus.OK, message: ErrorMessage.SERVER_HEALTH });
});

// Mount routes
app.use(`${baseUrl}`, restRouter);

// Error Routes
app.all('*', (req, _, __) => {
  throw new NotFoundException(`Can't find ${req?.originalUrl} on this server!`);
});
app.use(errorHandler);

process.on('unhandledRejection', (err) => {
  console.log(ErrorMessage.UNCAUGHT_REJECTION.red.underline.bold);
  logger.error(`UNCAUGHT REJECTION! ${err?.name}: ${err?.message}`, () =>
    process.exit(1),
  );
});

module.exports = app;
