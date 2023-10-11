import { mysqlTable, mysqlSchema, AnyMySqlColumn, decimal, int, varchar } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const reviews = mysqlTable("reviews", {
	reviewID: int("reviewID").autoincrement().notNull().primaryKey(),
	customerID: int("customerID").notNull(),
	name: varchar("reviewName", { length: 50 }).notNull(),
	text: varchar("reviewDescription", { length: 200 }).notNull(),
});

export const products = mysqlTable("products", {
	productID: int("productID", ).autoincrement().notNull().primaryKey(),
    productName: varchar("productName", { length: 40 }).notNull(),
    productDescription: varchar("productDescription", { length: 100 }).notNull(),
    productBrand: varchar("productBrand", { length: 30 }).notNull(),
    productCategory: varchar("productCategory", { length: 30 }).notNull(),
    productPictureLink: varchar("productPictureLink", { length: 100 }).notNull(),
    itemWeight: int("itemWeight").notNull(),
    itemPrice: decimal('itemPrice', {precision: 5, scale : 2 }).notNull(),
    itemQuantity: int("itemQuantity").notNull(),
});