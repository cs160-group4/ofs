"use server";

import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { addComment, deleteComment } from "@/lib/comments";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

const FormSchema = z.object({
  id: z.number(),
  userId: z.string(),
  productId: z.number(),
  text: z.string().min(1).max(255),
});

const CreateComment = FormSchema.pick({
  userId: true,
  productId: true,
  text: true,
});

export async function writeCommentAction(prevState: any, formData: FormData) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return { message: "Not logged in" };
    }
    const userId = session.user.id;
    const validatedFields = CreateComment.safeParse({
      userId: userId,
      productId: Number(formData.get("productId")),
      text: formData.get("text"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to comment.",
      };
    }
    const { productId, text } = validatedFields.data;
    const result = await addComment({ userId, productId, text });
    revalidatePath("/products/" + productId);
    redirect("?status=added");
  } catch (error) {
    return { message: "Database Error: Failed to update comment." };
  }
 
}

const DeleteComment = FormSchema.pick({ id: true });
export async function deleteCommentAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = DeleteComment.safeParse({
      id: Number(formData.get("id")),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Delete Comment.",
      };
    }
    const id: number = validatedFields.data.id as number;
    const result = await deleteComment(id);
  } catch (error) {
    return { message: "Database Error: Failed to Delete Comment." };
  }
  revalidatePath("/admin/comments");
}
