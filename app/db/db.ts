import * as schema from './schema'
import dotenv from "dotenv";
import { MySql2Database, drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

dotenv.config({ path: ".env.local" });

// const connection = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });

// export const db = drizzle(connection);


let db: MySql2Database<typeof schema>;
if (process.env.NODE_ENV === 'development') {
  db = singleton('db', () => {
    const poolConnection = mysql.createPool({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
    return drizzle(poolConnection)
  })
}
if (process.env.NODE_ENV === 'production') {
  const poolConnection = mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });
  db = drizzle(poolConnection)
}

//sourced from https://github.com/jenseng/abuse-the-platform/blob/2993a7e846c95ace693ce61626fa072174c8d9c7/app/utils/singleton.ts

export function singleton<Value>(name: string, value: () => Value): Value {
  const yolo = global as any
  yolo.__singletons ??= {}
  yolo.__singletons[name] ??= value()
  return yolo.__singletons[name]
}

export { db };