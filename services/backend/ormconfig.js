'use strict';

module.exports = {
  type: 'postgres',
  host: process.env.PGHOST || "localhost",
  port: process.env.PGPORT || 5432,
  username: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "postgres",
  migrations: ['*/migration/**/*.{ts,js}'] || "postgres",
  cli: {
    migrationsDir: 'migration',
  },
};
