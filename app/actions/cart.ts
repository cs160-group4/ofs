"use server";
import {
  addProductToCart,
  deleteProductFromCart,
  getProdInCart,
  updateProductInCart,
  updateSpecificProductInCart
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
  const formattedDateTime = formatDate(new Date());

  const schema = z.object({
    userId: z.string(),
    quantity: z.number().int().positive(),
    id: z.number(),
    updatedAt: z.string(),
    productId: z.number().int().positive()
  });
   
  try {
    const cartId = Number(formData.get("cartId"));

    const updatedCart = schema.safeParse({
      userId: formData.get("userId"),
      quantity: Number(formData.get("quantity")),
      id: Number(formData.get("cartId")),
      updatedAt: formattedDateTime,
      productId: Number(formData.get("productId"))
    });

    if(updatedCart.success){
      try {
        await updateSpecificProductInCart(cartId, updatedCart.data);
        return {success: true, message: "CART ITEM INFO HAS BEEN UPDATED"};
      } catch (updateError) {
        console.log(updateError);
        return {success: false, message: "FAILURE TO UPDATE INFO"};
      }
    } else {
      console.log(updatedCart.error);
      return { success: false, message: "Cart Item failed to be updated"}
    }
  } catch (error) {
    return {success: false, err: true, message: "Error: Cart Item failed to be updated"}
  }
}
