import { db } from "@/db/db";
import { cart, orders, products, user } from "@/db/schema";
import { and, eq, or, sql } from "drizzle-orm";
import { User } from "@/lib/users";
import { Product } from "@/lib/products";

export type Cart = typeof cart.$inferSelect;
export type NewCart = typeof cart.$inferInsert;

export type CartItem = {
  cart: Cart;
  products: Product;
  user: User;
};

export const getCarts = async () => {
  return await db.select().from(cart);
};

// get cart by user id
export const getCart = async (user_id: string) => {
  const result = await db
    .select()
    .from(cart)
    .where(eq(cart.userId, user_id))
    .leftJoin(products, eq(cart.productId, products.id))
    .leftJoin(user, eq(cart.userId, user.id));
  return result as CartItem[];
};

// get cart by user id
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

// add a product to cart
export const addProductToCart = async (data: NewCart) => {
  return await db.insert(cart).values(data);
};

// delete product from cart
export const deleteProductFromCart = async (id: number, user_id:string) => {
  return await db.delete(cart).where(sql`${cart.id} = ${id} and ${cart.userId} = ${user_id}`);
};

// update product in cart
export const updateSpecificProductInCart = async (id: number, data: NewCart) => {
  return await db.update(cart).set(data).where(eq(cart.id, id));
};

// update product in cart
export const updateProductInCart = async (id: number, quantity: number) => {
  return await db.update(cart).set({quantity: quantity}).where(eq(cart.id, id));
};

// delete all products from cart
export const deleteAllProductsFromCart = async (user_id: string) => {
  return await db.delete(cart).where(eq(cart.userId, user_id));
};
