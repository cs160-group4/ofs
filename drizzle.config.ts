import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default {
  driver: "mysql2",
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DB_URL || "",
  }
} satisfies Config;