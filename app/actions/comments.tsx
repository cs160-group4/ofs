"use server";

import { addComment } from "@/lib/comments";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
    id: z.string(),
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
        console.log("validatedFields.error.flatten().fieldErrors", validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to comment.",
      };
    }
    const { productId, text } = validatedFields.data;
    const result = await addComment({  userId, productId, text });
    revalidatePath("/products/" + productId);
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }


}


