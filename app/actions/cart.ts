"use server";
import { deleteProductFromCart, updateProductInCart } from "@/lib/cart";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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

export async function updateCartItemQuantity(formData: FormData) {
  try {
    const quantity = Number(formData.get("q"));
    
    //await updateProductInCart();
  } catch (error) {
    return { message: "Database Error: Failed to Update Cart Item" };
  }
  revalidatePath("/cart");
  return redirect("/cart");
}
