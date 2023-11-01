"use server";
import { deleteProductFromCart } from "@/lib/cart";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
export async function deleteCartProduct(formData: FormData) {
  try {
    const cartId = z.number().parse(formData.get("cartId"));
    await deleteProductFromCart(cartId);
  } catch (error) {
    return { message: "Database Error: Failed to Update Product." };
  }
  revalidatePath("/cart");
  return redirect("/cart");
}
