import type { Config } from "drizzle-kit";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/
import dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });


export default {
  driver: "mysql2",
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.DB_HOST as string,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USERNAME as string,
    database: process.env.DB_NAME as string,
  }
} satisfies Config;