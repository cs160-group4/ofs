import {
  int,
  decimal,
  timestamp,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  password: varchar("password", { length: 255 }),
  image: varchar("image", { length: 255 }),
  role: varchar("role", { length: 20 }).notNull().default("user"),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 255 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);

// The rest

export const orders = mysqlTable(
  "orders",
  {
    id: int("id").autoincrement().notNull(),
    totalWeight: int("total_weight").notNull(),
    totalPrice: decimal("total_price", { precision: 6, scale: 2 }).notNull(),
    deliveryStatus: varchar("delivery_status", { length: 20 }).notNull(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    robotId: int("robot_id")
      .notNull()
      .references(() => robots.id),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (table) => {
    return {
      ordersId: primaryKey(table.id),
    };
  }
);

export const products = mysqlTable(
  "products",
  {
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
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (table) => {
    return {
      productsId: primaryKey(table.id),
    };
  }
);

export const ratings = mysqlTable(
  "ratings",
  {
    id: int("id").autoincrement().notNull(),
    ratingValue: int("rating_value"),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: int("product_id")
      .notNull()
      .references(() => products.id),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (table) => {
    return {
      ratingsId: primaryKey(table.id),
    };
  }
);

export const reviews = mysqlTable(
  "reviews",
  {
    id: int("id").autoincrement().notNull(),
    text: varchar("text", { length: 100 }).notNull(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    productId: int("product_id")
      .notNull()
      .references(() => products.id),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow(),
  },
  (table) => {
    return {
      reviewsId: primaryKey(table.id),
    };
  }
);

export const robots = mysqlTable(
  "robots",
  {
    id: int("id").autoincrement().notNull(),
    status: varchar("status", { length: 20 }).notNull(),
  },
  (table) => {
    return {
      robotsId: primaryKey(table.id),
    };
  }
);
