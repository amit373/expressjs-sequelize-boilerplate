const restRouter = require('express').Router();

const { Routes } = require('../constants');
const { authRouter } = require('./auth.routes');
const { userRoleRouter } = require('./user-role.routes');

restRouter.use(Routes.USER_ROLE.DEFAULT, userRoleRouter);
restRouter.use(Routes.AUTH.DEFAULT, authRouter);

module.exports = { restRouter };
