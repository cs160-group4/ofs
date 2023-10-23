import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, int, decimal, varchar, timestamp, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const orders = mysqlTable("orders", {
	id: int("id").autoincrement().notNull(),
	totalWeight: int("total_weight").notNull(),
	totalPrice: decimal("total_price", { precision: 6, scale: 2 }).notNull(),
	deliveryStatus: varchar("delivery_status", { length: 20 }).notNull(),
	userId: int("user_id").notNull().references(() => users.id),
	robotId: int("robot_id").notNull().references(() => robots.id),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
	(table) => {
		return {
			ordersId: primaryKey(table.id),
		}
	});

export const products = mysqlTable("products", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 40 }).notNull(),
	description: varchar("description", { length: 100 }).notNull(),
	store: varchar("store", { length: 30 }).notNull(),
	brand: varchar("brand", { length: 30 }).notNull(),
	category: varchar("category", { length: 30 }).notNull(),
	picture: varchar("picture", { length: 100 }).notNull(),
	itemWeight: int("item_weight").notNull(),
	itemPrice: decimal("item_price", { precision: 5, scale: 2 }).notNull(),
	itemQuantity: int("item_quantity").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
	(table) => {
		return {
			productsId: primaryKey(table.id),
		}
	});

export const ratings = mysqlTable("ratings", {
	id: int("id").autoincrement().notNull(),
	ratingValue: int("rating_value"),
	userId: int("user_id").notNull().references(() => users.id),
	productId: int("product_id").notNull().references(() => products.id),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
	(table) => {
		return {
			ratingsId: primaryKey(table.id),
		}
	});

export const reviews = mysqlTable("reviews", {
	id: int("id").autoincrement().notNull(),
	text: varchar("text", { length: 100 }).notNull(),
	userId: int("user_id").notNull().references(() => users.id),
	productId: int("product_id").notNull().references(() => products.id),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
	(table) => {
		return {
			reviewsId: primaryKey(table.id),
		}
	});

export const robots = mysqlTable("robots", {
	id: int("id").autoincrement().notNull(),
	status: varchar("status", { length: 20 }).notNull(),
},
	(table) => {
		return {
			robotsId: primaryKey(table.id),
		}
	});

export const users = mysqlTable("users", {
	id: int("id").autoincrement().notNull(),
	firstName: varchar("first_name", { length: 50 }).notNull(),
	lastName: varchar("last_name", { length: 50 }).notNull(),
	email: varchar("email", { length: 50 }).notNull(),
	password: varchar("password", { length: 100 }).notNull(),
	passwordToken: varchar("password_token", { length: 50 }).notNull(),
	address: varchar("address", { length: 150 }).notNull(),
	phoneNumber: varchar("phone_number", { length: 10 }).notNull(),
	role: varchar("role", { length: 10 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
	(table) => {
		return {
			usersId: primaryKey(table.id),
			email: unique("email").on(table.email),
		}
	});