/* eslint-disable no-param-reassign */
const { toInteger } = require('../shared');

const paginate = (query = {}, { page = 1, pageSize = 10 }) => {
  page = toInteger(page);
  pageSize = toInteger(pageSize);

  const offset = (page === 0 ? 1 : page) - 1;
  const limit = pageSize;

  return {
    ...query,
    offset,
    limit,
  };
};

module.exports = { paginate };
