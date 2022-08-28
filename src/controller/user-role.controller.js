const { asyncHandler } = require('../middleware');
const { userRoleService } = require('../services');
const { logger, isNull, isBoolean, toInteger } = require('../shared');
const { BadRequestException, NotFoundException } = require('../errors');
const { ErrorMessage, HttpStatus } = require('../constants');

/**
  @desc   Create user role
  @param  { role }
  @method POST
  @route  /api/v2/user/role
  @access Private
*/
exports.createUserRoleHandler = asyncHandler(async (req, res, next) => {
  const { role } = req.body;

  const foundRole = await userRoleService.findOne({
    role,
    isActive: true,
  });

  if (!isNull(foundRole)) {
    return next(new BadRequestException(ErrorMessage.ALREADY_EXIST));
  }

  const createdUserRole = await userRoleService.create({
    role,
    isActive: true,
  });

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'User roles created successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'User role created successfully!',
    data: createdUserRole,
  });
});

/**
  @desc   Get user roles
  @query  { page, limit }
  @method GET
  @route  /api/v2/user/role
  @access Private
*/
exports.getUserRolesHandler = asyncHandler(async (req, res, _) => {
  const { page, pageSize } = req.query;
  const userRoles = await userRoleService.findAll(
    { isActive: true },
    ['id', 'role', 'isActive', 'createdAt', 'updatedAt'],
    {
      page: toInteger(page) || 1,
      pageSize: toInteger(pageSize) || 10,
    },
  );

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'User roles fetched successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'User roles fetched successfully!',
    data: userRoles,
  });
});

/**
  @desc   Get user role
  @query  { id }
  @method GET
  @route  /api/v2/user/role/:id
  @access Private
*/
exports.getUserRoleHandler = asyncHandler(async (req, res, next) => {
  const role = await userRoleService.findOne({
    id: req.params.id,
    isActive: true,
  });
  if (isNull(role)) {
    return next(new NotFoundException());
  }

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'User role fetched successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'User role fetched successfully!',
    data: role,
  });
});

/**
  @desc   Update user role
  @query  { role, id }
  @method PUT
  @route  /api/v2/user/role/:id
  @access Private
*/
exports.updateUserRoleHandler = asyncHandler(async (req, res, next) => {
  const { role, isActive } = req.body;
  const rolePayload = await userRoleService.findOne({
    id: req.params.id,
    isActive: true,
  });
  if (isNull(rolePayload)) {
    return next(new NotFoundException());
  }
  if (role) {
    rolePayload.role = role;
  }
  if (isBoolean(isActive)) {
    rolePayload.isActive = isActive;
  }
  rolePayload.updatedAt = new Date();
  await rolePayload.save();

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'User role updated successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'User role updated successfully!',
    data: rolePayload.toJSON(),
  });
});

/**
  @desc   Delete user role
  @query  id
  @method DELETE
  @route  /api/v2/user/role/:id
  @access Private
*/
exports.deleteUserRoleHandler = asyncHandler(async (req, res, next) => {
  const foundRole = await userRoleService.findOne({
    id: req.params.id,
    isActive: true,
  });
  if (isNull(foundRole)) {
    return next(new NotFoundException());
  }
  await userRoleService.remove({ id: req.params.id });

  logger.info(
    `${HttpStatus.OK} - ${req.originalUrl} [${req.method}] - 'User role deleted successfully!' `,
  );
  return res.status(HttpStatus.OK).json({
    statusCode: HttpStatus.OK,
    message: 'User role deleted successfully!',
  });
});
