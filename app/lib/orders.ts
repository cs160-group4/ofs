import { db } from "@/db/db";
import { orders } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";

export type Order = typeof orders.$inferSelect;

// get all orders
export const getOrders = async () => {
  return await db.select().from(orders);
};

// get orders by order id
export const getOrder = async (id: number) => {
  return await db.select().from(orders).where(eq(orders.id, id));
};

// get orders by user id
export const getOrdersByUserId = async (user_id: string) => {
  return await db.select().from(orders).where(eq(orders.userId, user_id));
};

// create order
export const createOrder = async (order: Order) => {
  return await db.insert(orders).values(order);
};

// delete order
export const deleteOrder = async (id: number) => {
  return await db.delete(orders).where(eq(orders.id, id));
};

// update order
export const updateOrder = async (id: number, data: Order) => {
  return await db.update(orders).set(data).where(eq(orders.id, id));
};

// delete all orders of the user
export const deleteAllOrders = async (user_id: string) => {
  return await db.delete(orders).where(eq(orders.userId, user_id));
};


