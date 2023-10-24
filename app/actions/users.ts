"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { User, insertUser } from "@/lib/users";
import { randomUUID } from "crypto";

export async function createUser(prevState: any, formData: FormData) {
  try {
    console.log("--- Creating user ---");
    const schema = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email().min(3).max(100),
      password: z.string().min(10),
      confirmPassword: z.string().min(10),
    });
    const result = schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (result.success) {
      console.log("Creating user", result.data);
      const data = result.data;
      if (data.password !== data.confirmPassword) {
        return {
          success: false,
          error: {
            confirmPassword: "Passwords do not match",
          },
        };
      }
          // const user: User = {
    //   id: randomUUID(), // https://www.rfc-editor.org/rfc/rfc4122.txt
    //   name: data.name,
    //   email: data.email,
    //   password: data.password,
    //   role: "user",
    //   emailVerified: null,
    //   image: "images/avatars/default.png",
    // };
    // await insertUser(user);
    //     revalidatePath("/");
    // return { message: `Added user ${data.email}` };
      return { success: true, data: result.data };
    }
    console.log("Error:\n", result.error.format());
    return { success: false, error: result.error.format() };


  } catch (e: any) {
    return { success: false, message: "Failed to create an account" };
  }
}
