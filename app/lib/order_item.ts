import { db } from "@/db/db";
import { orderItem } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";

export type OrderItem = typeof orderItem.$inferSelect;
export type NewOrderItem = typeof orderItem.$inferInsert;

export const getOrderItems = async () => {
  return await db.select().from(orderItem);
};

// get orderItem by order id
export const getOrderItem = async (order_id: number) => {
  return await db
    .select()
    .from(orderItem)
    .where(eq(orderItem.orderId, order_id));
};

// add order line
export const addOrderItem = async (data: NewOrderItem) => {
  return await db.insert(orderItem).values(data);
};

// delete order line
export const deleteOrderItem = async (order_id: number) => {
  return await db.delete(orderItem).where(eq(orderItem.orderId, order_id));
};

// update order line
export const updateOrderItem = async (order_id: number, data: NewOrderItem) => {
  return await db
    .update(orderItem)
    .set(data)
    .where(eq(orderItem.orderId, order_id));
};

// delete all order lines of the order
export const deleteAllOrderItems = async (order_id: number) => {
  return await db.delete(orderItem).where(eq(orderItem.orderId, order_id));
};

