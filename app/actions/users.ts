"use server";
import {
  NewUser,
  checkUserExists,
  deleteUser,
  insertUser,
  updateUserRole
} from "@/lib/users";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

const FormSchema = z.object({
  id: z.string(),
  // name is required, min length 1
  name: z.string().min(1).max(255),
  email: z.string().email().min(1).max(255),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string().default("customer"),
});

const CreateUser = FormSchema.pick({
  name: true,
  email: true,
  password: true,
  confirmPassword: true,
});
const UpdateUser = FormSchema.pick({ id: true, role: true });
const DeleteUser = FormSchema.pick({ id: true });

export async function createUser(prevState: any, formData: FormData) {
  try {
    const validatedFields = CreateUser.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (formData.get("password") !== formData.get("confirmPassword")) {
      return {
        errors: {
          confirmPassword: "Passwords do not match",
        },
        message: "Passwords do not match",
      };
    }
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Error Fields. Failed to Create User.",
      };
    }

    const { name, email, password, confirmPassword } = validatedFields.data;

    let id = randomUUID();
    let exists = await checkUserExists(id, email);
    if (exists) {
      return {
        errors: {
          email: "User already exists",
        },
        message: "User already exists",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    let user: NewUser = {
      id: id,
      name: name,
      email: email,
      password: hashedPassword,
      role: "customer",
      emailVerified: null,
    };
    await insertUser(user);
    revalidatePath("/");
    // success message
    return {
      success: true,
      message: "Congratulations! Your account has been successfully created.",
    };
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
  redirect("/admin/users?status=updated");
}

export async function deleteUserAction(prevState: any, formData: FormData) {
  const { id } = DeleteUser.parse({
    id: formData.get("id"),
  });
  try {
    const result = await deleteUser(id);
  } catch (error) {
    return { message: "Database Error: Failed to Delete User." };
  }
  revalidatePath("/admin/users");
}
