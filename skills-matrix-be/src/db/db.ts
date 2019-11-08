import * as pgPromise from "pg-promise";

const initOptions = {};

const dbConfig = {
  database: "skills_api",
  host: "localhost",
  idleTimeoutMillis: 30000,
  max: 20,
  password: "admin",
  port: 5432,
  user: "admin",
};

const pgp = pgPromise(initOptions);
const db = pgp(dbConfig);

export { db, pgp };
