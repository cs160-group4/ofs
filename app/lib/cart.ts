import { db } from "@/db/db";
import { cart, products, user } from "@/db/schema";
import { Product } from "@/lib/products";
import { User } from "@/lib/users";
import { and, eq, sql } from "drizzle-orm";

/*
  Authors: Hung Pham <mryo.hp@gmail.com>, Aaron Low <aaron.c.low@sjsu.edu>
  Copyright (c) 2023. All rights reserved.
*/

// cart types - by Hung Pham
export type Cart = typeof cart.$inferSelect;
export type NewCart = typeof cart.$inferInsert;

// cart item - by Hung Pham
export type CartItem = {
  cart: Cart;
  products: Product;
  user: User;
};

// get all carts - by Hung Pham
export const getCarts = async () => {
  return await db.select().from(cart);
};

// get cart by user id - by Hung Pham
export const getCart = async (user_id: string) => {
  const result = await db
    .select()
    .from(cart)
    .where(eq(cart.userId, user_id))
    .leftJoin(products, eq(cart.productId, products.id))
    .leftJoin(user, eq(cart.userId, user.id));
  return result as CartItem[];
};

// add a product to cart - by Hung Pham
export const addProductToCart = async (data: NewCart) => {
  return await db.insert(cart).values(data);
};

// update product in cart - by Hung Pham
export const updateProductInCart = async (id: number, quantity: number) => {
  return await db.update(cart).set({quantity: quantity}).where(eq(cart.id, id));
};

// delete all products from cart - by Hung Pham
export const deleteAllProductsFromCart = async (user_id: string) => {
  return await db.delete(cart).where(eq(cart.userId, user_id));
};

// get cart by user id - by Aaron Low
export const getProdInCart = async (user_id: string, prod_id : number) => {
  const result = await db
    .select({
      id : cart.id,
      userId : cart.userId,
      productId: cart.productId,
      quantity: cart.quantity
    })
    .from(cart)
    .where(and(eq(cart.userId, user_id), eq(cart.productId, prod_id)));
  return result[0] as Cart;
};

// delete product from cart - by Aaron Low
export const deleteProductFromCart = async (id: number, user_id:string) => {
  return await db.delete(cart).where(sql`${cart.id} = ${id} and ${cart.userId} = ${user_id}`);
};

// update product in cart - by Aaron Low
export const updateSpecificProductInCart = async (id: number, data: NewCart) => {
  return await db.update(cart).set(data).where(eq(cart.id, id));
};

