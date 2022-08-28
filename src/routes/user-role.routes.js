const Router = require('express').Router();

const {
  UserRoles: { ADMIN },
  Routes,
} = require('../constants');
const {
  userRoleController: {
    createUserRoleHandler,
    getUserRolesHandler,
    getUserRoleHandler,
    updateUserRoleHandler,
    deleteUserRoleHandler,
  },
} = require('../controller');
const { restrictTo, verifyToken } = require('../middleware');
const {
  userRole: { validateCreateUserRole },
} = require('../validations');

// Verify only created by admin
Router.route(Routes.USER_ROLE.SLASH)
  .post(
    // verifyToken,
    // restrictTo(ADMIN),
    validateCreateUserRole,
    createUserRoleHandler,
  )
  .get(getUserRolesHandler);

Router.route(Routes.USER_ROLE.ID)
  .get(verifyToken, restrictTo(ADMIN), getUserRoleHandler)
  .put(updateUserRoleHandler)
  .delete(verifyToken, restrictTo(ADMIN), deleteUserRoleHandler);

module.exports = { userRoleRouter: Router };
