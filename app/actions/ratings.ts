"use server";

import { rateProduct } from "@/lib/ratings";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

export async function productRatingAction(productId: number, rating: number) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return { message: "Not logged in" };
    }
    const userId = session.user.id;
    rateProduct(userId, productId, rating);
    revalidatePath("/products/" + productId);
    return { message: "Rating added" };
  } catch (error) {}
}
