import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, varchar, int, timestamp, decimal, unique } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const account = mysqlTable("account", {
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refreshToken: varchar("refresh_token", { length: 255 }),
	accessToken: varchar("access_token", { length: 255 }),
	expiresAt: int("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: varchar("id_token", { length: 255 }),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		accountProviderProviderAccountId: primaryKey(table.provider, table.providerAccountId),
	}
});

export const comments = mysqlTable("comments", {
	id: int("id").autoincrement().notNull(),
	text: varchar("text", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	productId: int("product_id").notNull().references(() => products.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		commentsId: primaryKey(table.id),
	}
});

export const orders = mysqlTable("orders", {
	id: int("id").autoincrement().notNull(),
	totalWeight: int("total_weight").notNull(),
	totalPrice: decimal("total_price", { precision: 6, scale: 2 }).notNull(),
	deliveryStatus: varchar("delivery_status", { length: 20 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	robotId: int("robot_id").references(() => robots.id),
},
(table) => {
	return {
		ordersId: primaryKey(table.id),
	}
});

export const productCategories = mysqlTable("product_categories", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 50 }).notNull(),
	slug: varchar("slug", { length: 50 }).notNull(),
	description: varchar("description", { length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		productCategoriesId: primaryKey(table.id),
	}
});

export const products = mysqlTable("products", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 40 }).notNull(),
	slug: varchar("slug", { length: 50 }),
	description: varchar("description", { length: 100 }).notNull(),
	brand: varchar("brand", { length: 30 }).notNull(),
	categoryId: int("category_id").notNull().references(() => productCategories.id, { onDelete: "cascade" } ),
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
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	productId: int("product_id").notNull().references(() => products.id, { onDelete: "cascade" } ),
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
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	productId: int("product_id").notNull().references(() => products.id, { onDelete: "cascade" } ),
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
	name: varchar("name", { length: 50 }),
},
(table) => {
	return {
		robotsId: primaryKey(table.id),
	}
});

export const session = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionSessionToken: primaryKey(table.sessionToken),
	}
});

export const user = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }),
	password: varchar("password", { length: 255 }),
	name: varchar("name", { length: 255 }),
	image: varchar("image", { length: 255 }).default('images/avatars/default.png'),
	role: varchar("role", { length: 20 }).default('customer').notNull(),
	firstName: varchar("first_name", { length: 100 }),
	lastName: varchar("last_name", { length: 100 }),
	phoneNumber: varchar("phone_number", { length: 25 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		userId: primaryKey(table.id),
		email: unique("email").on(table.email),
	}
});

export const verificationToken = mysqlTable("verificationToken", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierToken: primaryKey(table.identifier, table.token),
	}
});