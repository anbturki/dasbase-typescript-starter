'use strict';

module.exports = {
  type: 'pg',
  host: 'localhost',
  port: process.env.PG_PORT || "xiot",
  username: process.env.PG_USERNAME || "xiot",
  password: process.env.PG_PASSWORD || "xiot",
  database: process.env.PG_DATABASE || "xiot",
  migrations: ['migration/**/*.ts'] || "xiot",
  cli: {
    migrationsDir: 'migration',
  },
};
