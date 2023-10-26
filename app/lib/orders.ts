import { db } from "@/db/db";
import { orders } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export type Order = typeof orders.$inferSelect;

export const getOrders = async () => {
  return await db.select().from(orders).limit(5);
};
