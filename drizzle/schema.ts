import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const reviews = mysqlTable("reviews", {
	id: int("id").notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	text: varchar("text", { length: 200 }).notNull(),
});