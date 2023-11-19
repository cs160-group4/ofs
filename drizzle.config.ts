import type { Config } from "drizzle-kit";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default {
  driver: "mysql2",
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    uri: process.env.DB_URL as string,
  }
} satisfies Config;