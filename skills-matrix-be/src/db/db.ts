import * as pgPromise from 'pg-promise';

const initOptions = {};

const dbConfig = {
  user: 'admin',
  database: 'skills_api',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000
};

const pgp = pgPromise(initOptions);
const db = pgp(dbConfig);

export { db, pgp };
