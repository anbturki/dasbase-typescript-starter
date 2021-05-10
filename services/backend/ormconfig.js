'use strict';

module.exports = {
  type: 'postgres',
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5432,
  username: process.env.PGUSER || "xiot",
  password: process.env.PGPASSWORD || "xiot",
  database: process.env.PGDATABASE || "xiot",
  migrations: ['*/migration/**/*.{ts,js}'] || "xiot",
  cli: {
    migrationsDir: 'migration',
  },
};
