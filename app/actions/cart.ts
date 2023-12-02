"use server";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import {
  addProductToCart,
  deleteAllProductsFromCart,
  deleteProductFromCart,
  getProdInCart,
  updateProductInCart,
} from "@/lib/cart";
import { getProductById } from "@/lib/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/*
  Authors: Hung Pham <mryo.hp@gmail.com>, Fariha Ahmed <fariha.ahmed@sjsu.edu>
  Copyright (c) 2023. All rights reserved.
*/

// Add to Cart Action - by Hung Pham on November 8th, 2023
export async function addToCartAction(productId: number, quantity: number) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return { message: "Not logged in" };
    }
    const userId = session.user.id;
    const available = (await getProductById(productId)).itemQuantity;
    if (available < quantity) {
      return { message: "Not enough stock" };
    }
    const cart = await getProdInCart(userId, productId);
    if (cart) {
      let newQuantity: number = cart.quantity + quantity;

      if (newQuantity > available)
      {
        newQuantity = available
        await updateProductInCart(cart.id, newQuantity);
        return { message: "Cannot add more than stocked amount. Cart amount set to max stock." };
      }

      await updateProductInCart(cart.id, newQuantity);
    } else {
      await addProductToCart({ userId, productId, quantity });
    }

  } catch (error) {
    return { message: "Database Error: Failed to Add Product" };
  }
  revalidatePath("/products/" + productId);
  redirect("/products/" + productId + "?status=added");
}

// Delete Cart Product - by Fariha on November 7th, 2023
export async function deleteCartProduct(formData: FormData) {
  try {
    const cartId = Number(formData.get("cartId"));
    const userId = String(formData.get("userId"));
    await deleteProductFromCart(cartId, userId);

    const revalidateUrl = String(formData.get("revalidateUrl"));
    revalidatePath(revalidateUrl);
    return { message: "Deleted Product" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Remove Product",
    };
  }
}

// Update Cart Item - by Fariha on 11/16/2023
export async function updateCartItem(formData: FormData) {
  try {
    const cartId = Number(formData.get("cartId"));
    const quantity = Number(formData.get("quantity"));
    await updateProductInCart(cartId, quantity);

    const revalidateUrl = String(formData.get("revalidateUrl"));
    revalidatePath(revalidateUrl);
    return { message: "Updated Cart Item" };
  } catch (error) {
    return {
      message: "Database Error: Failed to update Cart Item",
    };
  }
}

// Delete All Cart Items - by Fariha on 11/16/2023
export async function deleteAllCartItems(userId: string) {
  try {
    const res = await deleteAllProductsFromCart(userId);
    return { success: true, message: "Deleted all Cart Items" };
  } catch (error) {
    return { message: "Database Error: Failed to delete all Cart Items" };
  }
  //return {message: "TESTING DELETING ALL CART ITEMS"}
}
