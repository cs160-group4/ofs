import dotenv from "dotenv";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
// dotenv.config({ path: ".env.local" });

// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });
// export const db = drizzle(connection);

const poolConnection = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

let db: MySql2Database;
declare global {
  var dbInstance: MySql2Database;
}
const env = process.env.NODE_ENV;
if (env == "production") {
  db = drizzle(poolConnection);
} else {
  if (!global.dbInstance) {
    global.dbInstance = drizzle(poolConnection);
  }
  // console.log("db exists, using global db");
  db = global.dbInstance;
}

export { db };
