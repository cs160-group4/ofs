import { db } from "@/db/db";
import { orderItem, products } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";

export type OrderItem = typeof orderItem.$inferSelect;
export type NewOrderItem = typeof orderItem.$inferInsert;
export type OrderItemWithProduct = {
  order_item: OrderItem;
  products: typeof products.$inferSelect;
};

export const getOrderItems = async () => {
  return await db.select().from(orderItem);
};

// get order line by order id
export const getOrderItemsByOrderId = async (order_id: number) => {
  let result =await db.select().from(orderItem).leftJoin(products, eq(orderItem.productId, products.id)).where(eq(orderItem.orderId, order_id));
  return result as OrderItemWithProduct[];
}

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
