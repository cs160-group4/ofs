import { db } from "@/db/db";
import { cart } from "@/db/schema";
import { eq, or, sql } from "drizzle-orm";

export type Cart = typeof cart.$inferSelect;

export const getCarts = async () => {
  return await db.select().from(cart);
};

// get cart by user id
export const getCart = async (user_id: string) => {
  return await db.select().from(cart).where(eq(cart.userId, user_id));
};

// add a product to cart
export const addProductToCart = async (data: Cart) => {
  return await db.insert(cart).values(data);
};

// delete product from cart
export const deleteProductFromCart = async (id: number) => {
  return await db.delete(cart).where(eq(cart.id, id));
};

// update product in cart
export const updateProductInCart = async (id: number, data: Cart) => {
  return await db.update(cart).set(data).where(eq(cart.id, id));
};

// delete all products from cart
export const deleteAllProductsFromCart = async (user_id: string) => {
  return await db.delete(cart).where(eq(cart.userId, user_id));
};


