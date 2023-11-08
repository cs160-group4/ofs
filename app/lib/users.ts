import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq, and, or, like, sql } from "drizzle-orm";

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export type NewEmail = {
  newEmail:string;
  confirmEmail:string;
  user_id:string;
};

export type NewPassword = {
  newPassword:string;
  confirmPassword:string;
  user_id:string;
};

export const authenticate = async (
  email: string,
  password: string
): Promise<User | null> => {
  const result: User[] = await db
    .select()
    .from(user)
    .where(and(eq(user.email, email), eq(user.password, password)))
    .limit(1);
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

// get all users
export const getUsers = async () => {
  const result: User[] = await db.select().from(user);
  return result;
};

// get user by id
export const getUser = async (id: string) => {
  const result: User[] = await db.select().from(user).where(eq(user.id, id));
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

export const getSessionUser = async (id: string) => {
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
};

// get user role by id
export const getUserRole = async (id: string): Promise<string> => {
  const result: User[] = await db.select().from(user).where(eq(user.id, id));
  if (result.length > 0) {
    return result[0].role;
  } else {
    return "user";
  }
};

const ITEMS_PER_PAGE = 10;
// get users pages
export const getUsersPages = async (query: string) => {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(user);
    const count = result[0].count;
    const pages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of users.");
  }
};
// get filtered users

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
        like(user.phoneNumber, `%${query}%`)
      )
    )
    .limit(10)
    .offset(offset);
  return result;
};

// add a user
export const insertUser = async (data: NewUser) => {
  return await db.insert(user).values(data);
};

// update user
export const updateUser = async (data: NewUser) => {
  return await db.update(user).set(data);
};

// update user role
export async function updateUserRole(id: string, role: string) {
  const result = await db
    .update(user)
    .set({ role: role })
    .where(eq(user.id, id));
  return result;
}

// delete user
export async function deleteUser(id: string) {
  try {
    return await db.delete(user).where(eq(user.id, id));
  } catch (error) {
    throw new Error("Failed to delete the user");
  }
}

// update email
export const updateNewEmail = async (data: NewEmail) => {
  return await db.update(user).set({email : data.newEmail}).where(eq(user.id, data.user_id));
};

// update password
export const updateNewPassword = async (data: NewPassword) => {
  return await db.update(user).set({password : data.newPassword}).where(eq(user.id, data.user_id));
};