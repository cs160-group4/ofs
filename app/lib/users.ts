import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

export const authenticate = async (
  email: string,
  password: string
): Promise<User | null> => {

  const result: User[] = await db
    .select()
    .from(user)
    .where(and(eq(user.email, email), eq(user.password, password))).limit(1);
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

// add a user
export const insertUser = async (data: NewUser) => {
  return db.insert(user).values(data);
};

// update user
export const updateUser = async (data: NewUser) => {
  return db.update(user).set(data);
};

// delete user
export const deleteUser = async (id: string) => {
  return db.delete(user).where(eq(user.id, id));
};
