"use server";
import {
  addProductToCart,
  deleteProductFromCart,
  getProdInCart,
  updateProductInCart,
} from "@/lib/cart";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getProductById } from "@/lib/products";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";

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
      await updateProductInCart(cart.id, newQuantity);
    } else {
      await addProductToCart({ userId, productId, quantity });
    }
    revalidatePath("/");
    return { message: "Added Product" };
  } catch (error) {
    return { message: "Database Error: Failed to Add Product" };
  }
}

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