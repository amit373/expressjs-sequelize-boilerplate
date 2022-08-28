const {
  models: { userDetails },
} = require('../models');

const findOne = (where = {}, attributes = []) => {
  const args = { where };
  if (attributes?.length > 0) {
    args.attributes = attributes;
  }
  return userDetails.findOne(args);
};

const findAll = (where = {}, attributes = []) => {
  const args = { where };
  if (attributes?.length > 0) {
    args.attributes = attributes;
  }
  return userDetails.findAll(args);
};

const count = (where = {}) => userDetails.count({ where });

const remove = (where = {}) => userDetails.destroy({ where });

const create = (values = {}) => userDetails.create(values);

const update = (values = {}, where = {}, returning = false) =>
  userDetails.update(values, { where, returning });

module.exports = {
  findOne,
  findAll,
  count,
  remove,
  create,
  update,
};
