const dotenv = require('dotenv');

const {
  toBool,
  toNumber,
  getOsEnv,
  normalizePort,
  EnvironmentType,
  getOsEnvOptional,
} = require('../shared/utils');

dotenv.config({ path: `.env.${getOsEnv('NODE_ENV')}` });

module.exports = {
  env: getOsEnv('NODE_ENV'),
  port: normalizePort(getOsEnv('PORT')),
  isProduction: getOsEnv('NODE_ENV') === EnvironmentType.PRODUCTION,
  isDevelopment: getOsEnv('NODE_ENV') === EnvironmentType.DEVELOPMENT,
  baseUrl: '/api/v1',
  db: {
    dialect: getOsEnv('DB_DIALECT'),
    username: getOsEnv('DB_USERNAME'),
    password: getOsEnv('DB_PASSWORD'),
    database: getOsEnv('DB_DATABASE'),
    host: getOsEnv('DB_HOST'),
    port: toNumber(getOsEnv('DB_PORT')),
    logging: toBool(getOsEnv('DB_LOGGING')),
  },
  jwt: {
    expiresIn: getOsEnv('EXPIRES_IN'),
    jwtSecret: getOsEnv('JWT_SECRET'),
  },
  hash: toNumber(getOsEnv('HASH_SALT')),
  cryptoRounds: toNumber(getOsEnv('CRYPTO_ROUNDS')),
  corsUrl: '*',
};
