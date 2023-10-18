import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, int, decimal, varchar, timestamp, unique } from "drizzle-orm/mysql-core"
import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, index, foreignKey, timestamp, decimal } from "drizzle-orm/mysql-core"
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
(table) => {
	return {
		customersCustomerId: primaryKey(table.customerId),
	}
});

export const delivery = mysqlTable("delivery", {
	deliveryId: int("deliveryID").autoincrement().notNull(),
	orderId: int("orderID").notNull().references(() => orders.orderId),
	robotId: int("robotID").notNull().references(() => robots.robotId),
	deliveryTime: timestamp("deliveryTime", { mode: 'string' }).notNull(),
	deliveryAddress: varchar("deliveryAddress", { length: 50 }).notNull(),
},
	(table) => {
		return {
			productsId: primaryKey(table.id),
		}
	});

export const orders = mysqlTable("orders", {
	orderId: int("orderID").autoincrement().notNull(),
	customerId: int("customerID").notNull().references(() => customers.customerId),
	robotId: int("robotID").notNull().references(() => robots.robotId),
	orderDate: timestamp("orderDate", { mode: 'string' }).notNull(),
	totalWeight: int("totalWeight").notNull(),
	totalPrice: decimal("totalPrice", { precision: 6, scale: 2 }).notNull(),
	deliveryStatus: varchar("deliveryStatus", { length: 20 }).notNull(),
},
	(table) => {
		return {
			ratingsId: primaryKey(table.id),
		}
	});

export const products = mysqlTable("products", {
	productId: int("productID").autoincrement().notNull(),
	productName: varchar("productName", { length: 40 }).notNull(),
	productDescription: varchar("productDescription", { length: 100 }).notNull(),
	productBrand: varchar("productBrand", { length: 30 }).notNull(),
	productCategory: varchar("productCategory", { length: 30 }).notNull(),
	productPictureLink: varchar("productPictureLink", { length: 100 }).notNull(),
	itemWeight: int("itemWeight").notNull(),
	itemPrice: decimal("itemPrice", { precision: 5, scale: 2 }).notNull(),
	itemQuantity: int("itemQuantity").notNull(),
},
	(table) => {
		return {
			reviewsId: primaryKey(table.id),
		}
	});

export const reviews = mysqlTable("reviews", {
<<<<<<< Updated upstream
	reviewId: int("reviewID").autoincrement().notNull(),
	customerId: int("customerID").notNull().references(() => customers.customerId),
	reviewName: varchar("reviewName", { length: 50 }).notNull(),
	reviewDescription: varchar("reviewDescription", { length: 200 }).notNull(),
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