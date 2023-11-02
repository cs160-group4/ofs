"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { User, insertUser, updateUserRole } from "@/lib/users";
import { randomUUID } from "crypto";
import { deleteUser } from "@/lib/users";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(50),
  email: z.string().email().min(3).max(100),
  password: z.string().min(10),
  confirmPassword: z.string().min(10),
  role: z.string({ invalid_type_error: "Please select a role" }),
});
export type State = {
  errors?: {
    name?: string[];
    role?: string[];
    status?: string[];
  };
  message?: string;
};
const UpdateUser = FormSchema.pick({ id: true, role: true });
const DeleteUser = FormSchema.pick({ id: true });

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

export async function updateUserRoleAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = UpdateUser.safeParse({
      id: formData.get("id"),
      role: formData.get("role"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Update User.",
      };
    }
    const { id, role } = validatedFields.data;
    const result = await updateUserRole(id, role);
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUserAction(prevState: any, formData: FormData) {
 
  const { id } = DeleteUser.parse({
    id: formData.get("id"),
  });
  try {
    // console.log("Delete Id: ", formData.get("id"));
    const result = await deleteUser(id);
    // console.log("result: ", result);
    revalidatePath("/admin/users");
    redirect("/admin/users");
    return { message: "Deleted User" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete User." };
  }
}
