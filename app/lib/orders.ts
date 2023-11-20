import { db } from "@/db/db";
import { addresses, orders, user } from "@/db/schema";
import { Addresses } from "@/lib/addresses";
import { User } from "@/lib/users";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { and, asc, desc, eq, like, or, sql, isNotNull } from "drizzle-orm";
import { Location } from "@/lib/utils";
/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderWithAddress = {
  orders: Order;
  addresses: Addresses;
};

export type OrderWithLocation = {
  id: number,
  weight: number,
  location: Location,
}


// get all orders
export const getOrders = async () => {
  return await db.select().from(orders).orderBy(asc(orders.createdAt));
};

// get lastest orders
export const getLatestOrders = async (limit: number) => {
  const result = await db
    .select()
    .from(orders)
    .leftJoin(user, eq(orders.userId, user.id))
    .orderBy(desc(orders.id))
    .limit(limit);
  return result;
};

// get number of orders
export const getOrderCount = async (): Promise<number> => {
  const result: Order[] = await db.select().from(orders);
  return result.length;
};

// get total revenue
export const getTotalRevenue = async (): Promise<number> => {
  const result: Order[] = await db.select().from(orders);
  let total = 0;
  result.forEach((order) => {
    total += Number(order.grandTotal);
  });
  return total;
};

// get orders by order id
export const getOrderById = async (id: number) => {
  let result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result[0];
};

// get orders by user id
export const getOrdersByUserId = async (user_id: string) => {
  return await db.select().from(orders).where(eq(orders.userId, user_id));
};

// get orders by user id and order id
export const getOrdersByUserIdAndOrderId = async (
  user_id: string,
  order_id: number
) => {
  let result = await db
    .select()
    .from(orders)
    .where(and(eq(orders.userId, user_id), eq(orders.id, order_id)));
  return result[0] as Order;
};

// get oders with addresses
export const getOrdersWithAddresses = async () => {
  let result = await db
    .select()
    .from(orders)
    .leftJoin(addresses, eq(orders.shippingAddressId, addresses.id));
  return result as OrderWithAddress[];
};

// get oders with addresses by user id
export const getOrdersWithAddressesByUserId = async (user_id: string) => {
  let result = await db
    .select()
    .from(orders)
    .leftJoin(addresses, eq(orders.shippingAddressId, addresses.id))
    .where(eq(orders.userId, user_id));
  return result as OrderWithAddress[];
};

/* get paginated orders */
// get the number of pages
export const getOrdersPages = async (query: string): Promise<number> => {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(orders);
    const count = result[0].count;
    const pages: number = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
};
// get filtered orders by page
export const getFilteredOrders = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const result = await db
    .select()
    .from(orders)
    .leftJoin(user, eq(orders.userId, user.id))
    .leftJoin(addresses, eq(orders.shippingAddressId, addresses.id))
    .where(
      or(
        like(orders.deliveryStatus, `%${query}%`),
        like(orders.grandTotal, `%${query}%`),
        like(user.name, `%${query}%`),
        like(addresses.addressLine1, `%${query}%`),
        like(addresses.city, `%${query}%`),
        like(addresses.state, `%${query}%`)
      )
    )
    .orderBy(desc(orders.createdAt))
    .limit(10)
    .offset(offset);
  return result as { orders: Order; user: User; addresses: Addresses }[];
};

// get pending orders with addresses and latitude and longitude not null
export const getPendingOrders = async () => {
  let result = await db
    .select()
    .from(orders)
    .leftJoin(addresses, eq(orders.shippingAddressId, addresses.id))
    .where(and(eq(orders.deliveryStatus, "pending"), isNotNull(addresses.latitude), isNotNull(addresses.longitude)));
  return result as OrderWithAddress[];
}



// create order
export const createOrder = async (order: NewOrder) => {
  return await db.insert(orders).values(order);
};

// delete order
export const deleteOrder = async (id: number) => {
  return await db.delete(orders).where(eq(orders.id, id));
};

// update order
export const updateOrder = async (id: number, data: NewOrder) => {
  return await db.update(orders).set(data).where(eq(orders.id, id));
};

//// update order with assigned robot - by Fariha Ahmed <fariha.ahmed@sjsu.edu>
// export const updateOrderWithRobotId = async (id: number, robot_id: number) => {
//   return await db.update(orders).set({robotId: robot_id}).where(eq(orders.id, id));
// }

// update order delivery status
export const updateOrderDeliveryStatus = async (
  id: number,
  deliveryStatus: string
) => {
  return await db
    .update(orders)
    .set({ deliveryStatus: deliveryStatus })
    .where(eq(orders.id, id));
};
// delete all orders of the user
export const deleteAllOrders = async (user_id: string) => {
  return await db.delete(orders).where(eq(orders.userId, user_id));
};
