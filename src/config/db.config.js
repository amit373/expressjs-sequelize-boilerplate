const {
  db: { username, password, database, host, dialect },
} = require('.');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
  },
  production: {
    username,
    password,
    database,
    host,
    dialect,
  },
  staging: {
    username,
    password,
    database,
    host,
    dialect,
  },
};
