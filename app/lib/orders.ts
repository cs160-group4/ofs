import { db } from "@/db/db";
import { orders, user, addresses } from "@/db/schema";
import { eq,asc, desc} from "drizzle-orm";
import { Addresses } from "@/lib/addresses";

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderWithAddress = {
  orders: Order;
  addresses: Addresses;
};
// get all orders
export const getOrders = async () => {
  return await db.select().from(orders).orderBy(asc(orders.createdAt));
};

// get lastest orders
export const getLatestOrders = async (limit: number) => {
  const result = await db.select().from(orders).leftJoin(user, eq(orders.userId, user.id)).orderBy(desc(orders.id)).limit(limit);
  return result
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
export const getOrder = async (id: number) => {
  return await db.select().from(orders).where(eq(orders.id, id));
};

// get orders by user id
export const getOrdersByUserId = async (user_id: string) => {
  return await db.select().from(orders).where(eq(orders.userId, user_id));
};

// get oders with addresses
export const getOrdersWithAddresses = async () => {
  let result = await db.select().from(orders).leftJoin(addresses, eq(orders.shippingAddressId, addresses.id));
  return result as OrderWithAddress[];
};

// get oders with addresses by user id
export const getOrdersWithAddressesByUserId = async (user_id: string) => {
  let result = await db.select().from(orders).leftJoin(addresses, eq(orders.shippingAddressId, addresses.id)).where(eq(orders.userId, user_id));
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

// delete all orders of the user
export const deleteAllOrders = async (user_id: string) => {
  return await db.delete(orders).where(eq(orders.userId, user_id));
};
