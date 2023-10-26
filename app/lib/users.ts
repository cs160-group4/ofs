import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type User = typeof user.$inferSelect;

export const authenticate = async (email: string, password: string): Promise<User | null> => {
  const result: User[] = await db
    .select()
    .from(user)
    .where(and(eq(user.email, email), eq(user.password, password)));
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

export const getUsers = async () => {
  const result: User[] = await db.select().from(user);
  return result;
};

export const getUser = async (id: string) => {
  const result: User[] = await db.select().from(user).where(eq(user.id, id));
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

export const getUserRole = async (id: string): Promise<string> => {
  const result: User[] = await db.select().from(user).where(eq(user.id, id));
  if (result.length > 0) {
    return result[0].role;
  } else {
    return "user";
  }
};

export const insertUser = async (data: User) => {
  return db.insert(user).values(data);
};

export const updateUser = async (data: User) => {
  return db.update(user).set(data);
};

export const deleteUser = async (data: User) => {
  return db.delete(user).where(eq(user.id, data.id));
};
