/* eslint-disable no-param-reassign */
const { isDevelopment } = require('../config');
const { HttpStatus, HttpMessage, ErrorMessage } = require('../constants');
const { logger } = require('../shared');

const logError = (err, req, res) => {
  const message =
    err?.message || res?.statusMessage || ErrorMessage.SOMETHING_WENT_WRONG;
  logger.error(
    `${err?.status || err?.statusCode} - ${req.originalUrl} [${
      req.method
    }] - ${message} `,
  );
};

const handleJWTError = (err, req, res) => {
  err.message = ErrorMessage.INVALID_TOKEN;
  logError(err, req, res);
  return res.status(HttpStatus.BAD_REQUEST).json({
    statusCode: HttpStatus.BAD_REQUEST,
    message: err.message,
  });
};

const handleJWTExpiredError = (err, req, res) => {
  err.message = ErrorMessage.TOKEN_EXPIRED;
  logError(err, req, res);
  return res.status(HttpStatus.BAD_REQUEST).json({
    statusCode: HttpStatus.BAD_REQUEST,
    message: err.message,
  });
};

const handleErrors = (err, req, res) => {
  if (err?.errors && err?.errors?.length > 1) {
    const errors = err.errors.map((el) => ({
      field: el.path,
      message: el.message,
    }));
    logError(err, req, res);
    return res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      errors,
    });
  }
  if (err?.errors && err?.errors?.length === 1) {
    err.message = err.errors[0].message;
    logError(err, req, res);
    return res.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: err.errors[0].message,
    });
  }
  return res.status(HttpStatus.BAD_REQUEST).json({
    statusCode: HttpStatus.BAD_REQUEST,
    message: err.message,
  });
};

const handleSequelizeErrors = (err, req, res) => {
  handleErrors(err, req, res);
};

const sendError = (err, req, res) => {
  if (isDevelopment) {
    console.error('Error 💥', {
      statusCode: err.statusCode,
      method: req.method,
      path: req.path,
      timestamp: new Date(),
      message: err.message,
    });
  }
  logError(err, req, res);
  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
  });
};

const sequelizeErrorArray = [
  'SequelizeUniqueConstraintError',
  'SequelizeValidationError',
  'SequelizeBulkRecordError',
  'AggregateError',
  'SequelizeAssociationError',
  'SequelizeBaseError',
  'SequelizeConnectionError',
  'SequelizeDatabaseError',
  'SequelizeEagerLoadingError',
  'SequelizeEmptyResultError',
  'SequelizeInstanceError',
  'SequelizeOptimisticLockError',
  'SequelizeQueryError',
];

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  err.statusCode = err?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  err.status = err?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const error = { ...err };
  error.message = err?.message || HttpMessage.INTERNAL_SERVER_ERROR;
  error.stack = err.stack;
  if (error?.name === 'JsonWebTokenError') {
    handleJWTError(error, req, res);
  } else if (error?.name === 'TokenExpiredError') {
    handleJWTExpiredError(error, req, res);
  } else if (sequelizeErrorArray.includes(error?.name)) {
    handleSequelizeErrors(error, req, res);
  } else {
    sendError(error, req, res);
  }
};
