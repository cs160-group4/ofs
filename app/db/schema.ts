import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const reviews = mysqlTable("reviews", {
	reviewID: int("reviewID").autoincrement().notNull().primaryKey(),
	customerID: int("customerID").notNull(),
	name: varchar("reviewName", { length: 50 }).notNull(),
	text: varchar("reviewDescription", { length: 200 }).notNull(),
});