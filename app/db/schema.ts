import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, index, foreignKey, timestamp, decimal } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const customers = mysqlTable("customers", {
	customerId: int("customerID").autoincrement().notNull(),
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
	deliveryId: int("deliveryID").autoincrement().notNull(),
	orderId: int("orderID").notNull().references(() => orders.orderId),
	robotId: int("robotID").notNull().references(() => robots.robotId),
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
		customerId: index("customerID").on(table.customerId),
		robotId: index("robotID").on(table.robotId),
		ordersOrderId: primaryKey(table.orderId),
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
		productsProductId: primaryKey(table.productId),
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
		customerId: index("customerID").on(table.customerId),
		reviewsReviewId: primaryKey(table.reviewId),
	}
});

export const robots = mysqlTable("robots", {
	robotId: int("robotID").autoincrement().notNull(),
	currentWeight: int("currentWeight").notNull(),
	deliveryStatus: varchar("deliveryStatus", { length: 20 }).notNull(),
},
(table) => {
	return {
		robotsRobotId: primaryKey(table.robotId),
	}
});
=======
	reviewID: int("reviewID").autoincrement().notNull().primaryKey(),
	customerID: int("customerID").notNull(),
	name: varchar("reviewName", { length: 50 }).notNull(),
	text: varchar("reviewDescription", { length: 200 }).notNull(),
});

export const customers = mysqlTable( "")
>>>>>>> Stashed changes
