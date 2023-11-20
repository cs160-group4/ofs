import { db } from "@/db/db";
import { delivery, orders, robots } from "@/db/schema";
import { Order, OrderWithLocation } from "@/lib/orders";
import { Robot } from "@/lib/robots";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { asc, eq, like, or, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export type Delivery = typeof delivery.$inferSelect;
export type NewDelivery = typeof delivery.$inferInsert;

// get all delivery
export const getDeliveryList = async () => {
  let result = await db
    .select()
    .from(delivery)
    .leftJoin(orders, eq(orders.id, delivery.orderId))
    .where(eq(orders.deliveryStatus, "delivering"));

  let deliveryList: Delivery[] = [];
  for (let i = 0; i < result.length; i++) {
    deliveryList.push(result[i].delivery);
  }
  return deliveryList;
};

// get delivery by id
export const getDeliveryById = async (id: number) => {
  return await db.select().from(delivery).where(eq(delivery.id, id));
};

export const getDeliveriesByRobotId = async (id: number) => {
  let result = await db.select().from(delivery).where(eq(delivery.robotId, id));
  return result as Delivery[];
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
    .leftJoin(orders, eq(orders.id, delivery.orderId))
    .where(
      or(
        like(delivery.deliveredAt, `%${query}%`),
        like(delivery.createdAt, `%${query}%`),
        like(delivery.updatedAt, `%${query}%`),
        like(robots.name, `%${query}%`)
      )
    )
    .orderBy(asc(robots.id))
    .limit(10)
    .offset(offset);
  return result as { delivery: Delivery; robots: Robot; orders: Order }[];
};

export async function setDeliveryToRobot(
  robotId: number,
  newOrders: OrderWithLocation[]
) {
  return new Promise(async (resolve, reject) => {
    try {
      const total_weight = newOrders.reduce(
        (sum, order) => sum + order.weight,
        0
      );

      await db
        .update(robots)
        .set({ status: "delivering", currentWeightInLbs: total_weight })
        .where(eq(robots.id, robotId));

      for (let i = 0; i < newOrders.length; i++) {
        await db
          .update(orders)
          .set({ deliveryStatus: "delivering" })
          .where(eq(orders.id, newOrders[i].id));

        const new_delivery: NewDelivery = {
          robotId: robotId,
          orderId: newOrders[i].id,
          latitude: newOrders[i].location.latitude.toString(),
          longitude: newOrders[i].location.longitude.toString(),
        };

        await db.insert(delivery).values(new_delivery);
      }

      revalidatePath("/admin/delivery");
      resolve("Delivery set successfully");
    } catch (err) {}
  });
}
