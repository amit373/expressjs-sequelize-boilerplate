const authService = require('./auth.service');
const userRoleService = require('./user-role.service');
const bcryptService = require('./bcrypt.service');
const sequelizeService = require('./sequelize.service');

module.exports = {
  authService,
  bcryptService,
  userRoleService,
  sequelizeService,
};
