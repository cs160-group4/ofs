import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, varchar, int, decimal, timestamp, unique } from "drizzle-orm/mysql-core"
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
		accountProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"}),
	}
});

export const addresses = mysqlTable("addresses", {
	id: int("id").autoincrement().notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	addressLine1: varchar("address_line1", { length: 255 }).notNull(),
	addressLine2: varchar("address_line2", { length: 255 }),
	city: varchar("city", { length: 100 }).notNull(),
	state: varchar("state", { length: 100 }).notNull(),
	postalCode: varchar("postal_code", { length: 20 }).notNull(),
	country: varchar("country", { length: 100 }),
	latitude: decimal("latitude", { precision: 12, scale: 8 }),
	longitude: decimal("longitude", { precision: 12, scale: 8 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		addressesIdPk: primaryKey({ columns: [table.id], name: "addresses_id_pk"}),
	}
});

export const cart = mysqlTable("cart", {
	id: int("id").autoincrement().notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	productId: int("product_id").notNull().references(() => products.id, { onDelete: "cascade" } ),
	quantity: int("quantity").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		cartIdPk: primaryKey({ columns: [table.id], name: "cart_id_pk"}),
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
		commentsIdPk: primaryKey({ columns: [table.id], name: "comments_id_pk"}),
	}
});

export const coupons = mysqlTable("coupons", {
	id: int("id").autoincrement().notNull(),
	code: varchar("code", { length: 100 }).notNull(),
	discount: decimal("discount", { precision: 5, scale: 2 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		couponsIdPk: primaryKey({ columns: [table.id], name: "coupons_id_pk"}),
	}
});

export const delivery = mysqlTable("delivery", {
	id: int("id").autoincrement().notNull(),
	orderId: int("order_id").notNull().references(() => orders.id, { onDelete: "cascade" } ),
	robotId: int("robot_id").notNull().references(() => robots.id, { onDelete: "cascade" } ),
	latitude: decimal("latitude", { precision: 12, scale: 8 }),
	longitude: decimal("longitude", { precision: 12, scale: 8 }),
	deliveryAt: timestamp("delivery_at", { mode: 'string' }).notNull(),
	deliveryStatus: varchar("delivery_status", { length: 20 }).default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		deliveryIdPk: primaryKey({ columns: [table.id], name: "delivery_id_pk"}),
	}
});

export const orderItem = mysqlTable("order_item", {
	id: int("id").autoincrement().notNull(),
	orderId: int("order_id").notNull().references(() => orders.id, { onDelete: "cascade" } ),
	productId: int("product_id").references(() => products.id, { onDelete: "set null" } ),
	productName: varchar("product_name", { length: 100 }),
	itemWeight: int("item_weight").notNull(),
	quantity: int("quantity").notNull(),
	price: decimal("price", { precision: 6, scale: 2 }).notNull(),
	productImage: varchar("product_image", { length: 255 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		orderItemIdPk: primaryKey({ columns: [table.id], name: "order_item_id_pk"}),
	}
});

export const orders = mysqlTable("orders", {
	id: int("id").autoincrement().notNull(),
	totalWeight: int("total_weight").notNull(),
	shippingCost: decimal("shipping_cost", { precision: 10, scale: 2 }).notNull(),
	tax: decimal("tax", { precision: 10, scale: 2 }).notNull(),
	discount: decimal("discount", { precision: 10, scale: 2 }).notNull(),
	subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
	grandTotal: decimal("grand_total", { precision: 10, scale: 2 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
	shippingAddressId: int("shipping_address_id").references(() => addresses.id, { onDelete: "set null" } ),
	deliveryStatus: varchar("delivery_status", { length: 20 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
},
(table) => {
	return {
		ordersIdPk: primaryKey({ columns: [table.id], name: "orders_id_pk"}),
	}
});

export const paymentMethods = mysqlTable("payment_methods", {
	id: int("id").autoincrement().notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	cardNumber: varchar("card_number", { length: 20 }).notNull(),
	expirationDate: varchar("expiration_date", { length: 7 }).notNull(),
	cvv: varchar("cvv", { length: 4 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		paymentMethodsIdPk: primaryKey({ columns: [table.id], name: "payment_methods_id_pk"}),
	}
});

export const productCategories = mysqlTable("product_categories", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 100 }).notNull(),
	description: varchar("description", { length: 255 }),
	image: varchar("image", { length: 100 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		productCategoriesIdPk: primaryKey({ columns: [table.id], name: "product_categories_id_pk"}),
	}
});

export const products = mysqlTable("products", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	slug: varchar("slug", { length: 100 }),
	description: varchar("description", { length: 255 }).notNull(),
	brand: varchar("brand", { length: 30 }).notNull(),
	categoryId: int("category_id").notNull().references(() => productCategories.id, { onDelete: "cascade" } ),
	picture: varchar("picture", { length: 255 }).notNull(),
	itemWeight: int("item_weight").notNull(),
	itemPrice: decimal("item_price", { precision: 5, scale: 2 }).notNull(),
	itemQuantity: int("item_quantity").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		productsIdPk: primaryKey({ columns: [table.id], name: "products_id_pk"}),
	}
});

export const ratings = mysqlTable("ratings", {
	id: int("id").autoincrement().notNull(),
	ratingValue: int("rating_value").notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	productId: int("product_id").notNull().references(() => products.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		ratingsIdPk: primaryKey({ columns: [table.id], name: "ratings_id_pk"}),
	}
});

export const reviews = mysqlTable("reviews", {
	id: int("id").autoincrement().notNull(),
	text: varchar("text", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	productId: int("product_id").notNull().references(() => products.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		reviewsIdPk: primaryKey({ columns: [table.id], name: "reviews_id_pk"}),
	}
});

export const robots = mysqlTable("robots", {
	id: int("id").autoincrement().notNull(),
	status: varchar("status", { length: 20 }).notNull(),
	name: varchar("name", { length: 100 }),
	maxOrders: int("max_orders").default(10).notNull(),
	maxWeightInLbs: int("max_weight_in_lbs").default(200).notNull(),
	currentWeightInLbs: int("current_weight_in_lbs").default(0).notNull(),
	latitude: decimal("latitude", { precision: 12, scale: 8 }).default('0.00000000'),
	longitude: decimal("longitude", { precision: 12, scale: 8 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		robotsIdPk: primaryKey({ columns: [table.id], name: "robots_id_pk"}),
	}
});

export const session = mysqlTable("session", {
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
	userId: varchar("userId", { length: 255 }).notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionSessionTokenPk: primaryKey({ columns: [table.sessionToken], name: "session_sessionToken_pk"}),
	}
});

export const user = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { fsp: 3, mode: 'string' }),
	password: varchar("password", { length: 255 }),
	name: varchar("name", { length: 255 }),
	image: varchar("image", { length: 255 }),
	role: varchar("role", { length: 20 }).default('customer').notNull(),
	firstName: varchar("first_name", { length: 100 }),
	lastName: varchar("last_name", { length: 100 }),
	phoneNumber: varchar("phone_number", { length: 25 }),
	createdAt: timestamp("created_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
},
(table) => {
	return {
		userIdPk: primaryKey({ columns: [table.id], name: "user_id_pk"}),
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
		verificationTokenIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"}),
	}
});