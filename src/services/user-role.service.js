const sequelizeService = require('./sequelize.service');
const {
  models: { userRole },
} = require('../models');

const findOne = (where = {}, attributes = []) => {
  const args = { where };
  if (attributes?.length > 0) {
    args.attributes = attributes;
  }
  return userRole.findOne(args);
};

const findAll = (where = {}, attributes = [], { page, pageSize }) => {
  const args = { where };
  if (attributes?.length > 0) {
    args.attributes = attributes;
  }
  return userRole.findAll({
    ...args,
    ...sequelizeService.paginate(args, { page, pageSize }),
  });
};

const count = (where = {}) => userRole.count({ where });

const remove = (where = {}) => userRole.destroy({ where });

const create = (values = {}) => userRole.create(values);

const update = (values = {}, where = {}, returning = false) =>
  userRole.update(values, { where, returning });

module.exports = {
  findOne,
  findAll,
  count,
  remove,
  create,
  update,
};
