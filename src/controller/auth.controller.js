const { asyncHandler } = require('../middleware');
const { logger } = require('../shared');

/**
  @desc   Login user
  @param  { email, password }
  @method POST
  @route  /api/v1/auth/login
  @access Public
*/
exports.loginHandler = asyncHandler(async (req, res, _) => {
  logger.info(
    `${200} - ${req.originalUrl} [${req.method}] - 'Login successfully!' `,
  );
  return res.status(200).json({
    statusCode: 200,
    message: 'Login successfully!',
    data: null,
  });
});
