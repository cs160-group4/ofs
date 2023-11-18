import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq, and, or, like, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import { ITEMS_PER_PAGE } from "@/lib/utils";

/*
  Authors: Hung Pham <mryo.hp@gmail.com>, Aaron Low <aaron.c.low@sjsu.edu>
  Copyright (c) 2023. All rights reserved.
*/

// type for user - by Hung Pham
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

// type for new email - by Aaron Low
export type NewEmail = { 
  newEmail: string;
  confirmEmail: string;
  user_id: string;
};

// type for new password - by Aaron Low
export type NewPassword = {
  newPassword: string;
  confirmPassword: string;
  user_id: string;
};

// authenticate user - by Hung Pham
export const authenticate = async (
  email: string,
  password: string
): Promise<User | null> => {
  const result: User[] = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);
  if (result.length > 0) {
    const dbPassword: string = result[0].password as string;
    const valid = await bcrypt.compare(password, dbPassword);
    if (valid) {
      return result[0];
    }
  }
  return null;
};
// get all users - by Hung Pham
export const getUsers = async () => {
  const result: User[] = await db.select().from(user);
  return result;
};

// get user by id - by Hung Pham
export const getUser = async (id: string) => {
  const result: User[] = await db.select().from(user).where(eq(user.id, id));
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

// get Session User - by Hung Pham
export const getSessionUser = async (id: string) => {
  try {
    const result: User[] = await db.select().from(user).where(eq(user.id, id));
    if (result.length > 0) {
      return {
        id: result[0].id,
        name: result[0].name,
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        email: result[0].email,
        phoneNumber: result[0].phoneNumber,
        image: result[0].image,
        role: result[0].role,
        createdAt: result[0].createdAt,
        updatedAt: result[0].updatedAt,
      };
    } else {
      return null;
    }
  } catch (error) {
    
  }
};

// get user role by id - by Hung Pham
export const getUserRole = async (id: string): Promise<string> => {
  const result: User[] = await db.select().from(user).where(eq(user.id, id));
  if (result.length > 0) {
    return result[0].role;
  } else {
    return "customer";
  }
};

// get users pages - by Hung Pham
export const getUsersPages = async (query: string): Promise<number> => {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(user);
    const count = result[0].count;
    const pages: number = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
};

// get filtered users - by Hung Pham
export const getFilteredUsers = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // get all users that match the query (like name, email, and phone_number)
  const result: User[] = await db
    .select()
    .from(user)
    .where(
      or(
        like(user.name, `%${query}%`),
        like(user.email, `%${query}%`),
        like(user.phoneNumber, `%${query}%`),
        like(user.role, `%${query}%`)
      )
    )
    .limit(10)
    .offset(offset);
  return result;
};

// Check if user exists - by Hung Pham
export const checkUserExists = async (id: string, email: string) => {
  const result: User[] = await db
    .select()
    .from(user)
    .where(or(eq(user.id, id), eq(user.email, email)));
  if (result.length > 0) {
    return true;
  } else {
    return false;
  }
};

// add a user - by Hung Pham
export const insertUser = async (data: NewUser) => {
  return await db.insert(user).values(data);
};

// update user - by Hung Pham
export const updateUser = async (data: NewUser) => {
  return await db.update(user).set(data);
};

// update user role - by Hung Pham
export async function updateUserRole(id: string, role: string) {
  const result = await db
    .update(user)
    .set({ role: role })
    .where(eq(user.id, id));
  return result;
}

// delete user - by Hung Pham
export async function deleteUser(id: string) {
  try {
    return await db.delete(user).where(eq(user.id, id));
  } catch (error) {
    throw new Error("Failed to delete the user");
  }
}

// update email - by Aaron Low
export const updateNewEmail = async (data: NewEmail) => {
  return await db
    .update(user)
    .set({ email: data.newEmail })
    .where(eq(user.id, data.user_id));
};

// update password - by Aaron Low
export const updateNewPassword = async (data: NewPassword) => {
  return await db
    .update(user)
    .set({ password: data.newPassword })
    .where(eq(user.id, data.user_id));
};
