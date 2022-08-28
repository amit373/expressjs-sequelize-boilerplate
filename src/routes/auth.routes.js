const Router = require('express').Router();

const { Routes } = require('../constants');
const {
  authController: { loginHandler },
} = require('../controller');
const {
  auth: { validateLogin },
} = require('../validations');

Router.post(Routes.AUTH.LOGIN, validateLogin, loginHandler);

module.exports = { authRouter: Router };
