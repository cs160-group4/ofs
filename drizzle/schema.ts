import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, int, decimal, varchar, timestamp, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const customers = mysqlTable("customers", {
<<<<<<< Updated upstream
	customerId: int("customerID").autoincrement().notNull(),
=======
	customerId: bigint("customerID", { mode: "number" }).autoincrement().notNull().primaryKey(),
>>>>>>> Stashed changes
	firstName: varchar("firstName", { length: 20 }).notNull(),
	lastName: varchar("lastName", { length: 20 }).notNull(),
	email: varchar("email", { length: 30 }).notNull(),
	passwordToken: varchar("passwordToken", { length: 30 }).notNull(),
	customerAddress: varchar("customerAddress", { length: 30 }).notNull(),
	phoneNumber: varchar("phoneNumber", { length: 10 }).notNull(),
},
(table) => {
	return {
		customersCustomerId: primaryKey(table.customerId),
	}
});

export const delivery = mysqlTable("delivery", {
<<<<<<< Updated upstream
	deliveryId: int("deliveryID").autoincrement().notNull(),
	orderId: int("orderID").notNull().references(() => orders.orderId),
	robotId: int("robotID").notNull().references(() => robots.robotId),
=======
	deliveryId: bigint("deliveryID", { mode: "number" }).autoincrement().notNull(),
	orderId: bigint("orderID", { mode: "number" }).notNull().references(() => orders.orderId),
	robotId: bigint("robotID", { mode: "number" }).notNull().references(() => robots.robotId),
>>>>>>> Stashed changes
	deliveryTime: timestamp("deliveryTime", { mode: 'string' }).notNull(),
	deliveryAddress: varchar("deliveryAddress", { length: 50 }).notNull(),
},
(table) => {
	return {
		orderId: index("orderID").on(table.orderId),
		robotId: index("robotID").on(table.robotId),
		deliveryDeliveryId: primaryKey(table.deliveryId),
	}
});

export const orders = mysqlTable("orders", {
<<<<<<< Updated upstream
	orderId: int("orderID").autoincrement().notNull(),
	customerId: int("customerID").notNull().references(() => customers.customerId),
	robotId: int("robotID").notNull().references(() => robots.robotId),
=======
	orderId: bigint("orderID", { mode: "number" }).autoincrement().notNull(),
	customerId: bigint("customerID", { mode: "number" }).notNull().references(() => customers.customerId),
	robotId: bigint("robotID", { mode: "number" }).notNull().references(() => robots.robotId),
>>>>>>> Stashed changes
	orderDate: timestamp("orderDate", { mode: 'string' }).notNull(),
	totalWeight: int("totalWeight").notNull(),
	totalPrice: decimal("totalPrice", { precision: 6, scale: 2 }).notNull(),
	deliveryStatus: varchar("deliveryStatus", { length: 20 }).notNull(),
},
(table) => {
	return {
		customerId: index("customerID").on(table.customerId),
		robotId: index("robotID").on(table.robotId),
		ordersOrderId: primaryKey(table.orderId),
	}
});

export const products = mysqlTable("products", {
<<<<<<< Updated upstream
	productId: int("productID").autoincrement().notNull(),
=======
	productId: bigint("productID", { mode: "number" }).autoincrement().notNull(),
>>>>>>> Stashed changes
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
		productsProductId: primaryKey(table.productId),
	}
});

export const reviews = mysqlTable("reviews", {
	reviewId: int("reviewID").autoincrement().notNull(),
<<<<<<< Updated upstream
	customerId: int("customerID").notNull().references(() => customers.customerId),
=======
	customerId: bigint("customerID", { mode: "number" }).notNull().references(() => customers.customerId),
>>>>>>> Stashed changes
	reviewName: varchar("reviewName", { length: 50 }).notNull(),
	reviewDescription: varchar("reviewDescription", { length: 200 }).notNull(),
},
(table) => {
	return {
		customerId: index("customerID").on(table.customerId),
		reviewsReviewId: primaryKey(table.reviewId),
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