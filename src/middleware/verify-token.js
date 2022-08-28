const asyncHandler = require('./async-handler');
const { models } = require('../models');
const { jwtService } = require('../services');
const { isNull } = require('../shared');
const { ErrorMessage } = require('../constants');
const { UnauthorizedException } = require('../errors');

// @desc   Verify Token Middleware
const verifyToken = asyncHandler(async (req, _, next) => {
  // 1) Getting token and check of it's there
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith('Bearer')) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(' ')[1];
  }

  if (!token) {
    throw new UnauthorizedException(ErrorMessage.NOT_LOGGED_IN);
  }

  // 2) Verification token
  const decoded = await jwtService.verifyToken(token);
  if (!decoded || !decoded.id) {
    throw new UnauthorizedException(ErrorMessage.USER_WITH_TOKEN_NOT_EXIST);
  }

  // 3) Check if user still exists
  const currentUser = await models.userDetails.findByPk(decoded?.id, {
    attributes: [
      'user_id',
      'user_email',
      'user_number',
      'user_org_domain',
      'user_login_type',
      'created_at',
    ],
    include: [
      {
        model: models.userRole,
        as: 'user_role_master',
        attributes: ['user_role'],
      },
    ],
  });
  if (!currentUser || isNull(currentUser)) {
    throw new UnauthorizedException(ErrorMessage.USER_WITH_TOKEN_NOT_EXIST);
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  return next();
});

module.exports = {
  verifyToken,
};
