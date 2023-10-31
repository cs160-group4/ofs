import { db } from "@/db/db";
import { addresses } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";

export type Addresses = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;

export const getAddresses = async () => {
  return await db.select().from(addresses);
};

// get address by user id
export const getAddress = async (user_id: string) => {
  return await db.select().from(addresses).where(eq(addresses.userId, user_id));
};

// add a address to user
export const addAddress = async (data: NewAddress) => {
  return await db.insert(addresses).values(data);
};

// delete address
export const deleteAddress = async (id: number) => {
  return await db.delete(addresses).where(eq(addresses.id, id));
};

// update address
export const updateAddress = async (id: number, data: Addresses) => {
  return await db.update(addresses).set(data).where(eq(addresses.id, id));
};

// delete all addresses of the user
export const deleteAllAddresses = async (user_id: string) => {
  return await db.delete(addresses).where(eq(addresses.userId, user_id));
};