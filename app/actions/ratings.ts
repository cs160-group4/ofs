"use server";

import { rateProduct } from "@/lib/ratings";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

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
