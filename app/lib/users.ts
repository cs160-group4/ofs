import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq, and, or, like, sql } from "drizzle-orm";

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

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
  return db.insert(user).values(data);
};

// update user
export const updateUser = async (data: NewUser) => {
  return db.update(user).set(data);
};

// update user role
export const updateUserRole = async (id: string, role: string) => {
  return db.update(user).set({ role: role }).where(eq(user.id, id));
};

// delete user
export const deleteUser = async (id: string) => {
  return db.delete(user).where(eq(user.id, id));
};
