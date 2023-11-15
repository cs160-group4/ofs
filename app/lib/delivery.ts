import { db } from "@/db/db";
import { delivery, robots } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { eq, like, or, sql, asc } from "drizzle-orm";
import { Robot } from "@/lib/robots";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export type Delivery = typeof delivery.$inferSelect;
export type NewDelivery = typeof delivery.$inferInsert;

// get all delivery
export const getDelivery = async () => {
  return await db.select().from(delivery);
};

// get delivery by id
export const getDeliveryById = async (id: number) => {
  return await db.select().from(delivery).where(eq(delivery.id, id));
};

/* get paginated delivery */
// get the number of pages
export const getDeliveryPages = async (query: string): Promise<number> => {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(delivery);
    const count = result[0].count;
    const pages: number = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
};

// get filtered delivery by page
export const getFilteredDelivery = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const result = await db
    .select()
    .from(delivery)
    .leftJoin(robots, eq(robots.id, delivery.robotId))
    .where(
      or(
        like(delivery.deliveryStatus, `%${query}%`),
        like(delivery.deliveryAt, `%${query}%`),
        like(delivery.createdAt, `%${query}%`),
        like(delivery.updatedAt, `%${query}%`),
        like(robots.name, `%${query}%`),
      )
    )
    .orderBy(asc(delivery.id))
    .limit(10)
    .offset(offset);
  return result as { delivery: Delivery; robots: Robot }[];
};
