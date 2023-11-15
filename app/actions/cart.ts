"use server";
import {
  addProductToCart,
  deleteProductFromCart,
  getProdInCart,
  updateProductInCart
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

  } catch (error) {
    return { message: "Database Error: Failed to Add Product" };
  }
  revalidatePath("/");
  return { message: "Added Product" };
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
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
