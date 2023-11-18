import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

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
  db = global.dbInstance;
}

export { db };
