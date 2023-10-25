import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export type User = typeof users.$inferSelect;

export const authenticate = async (email: string, password: string) => {
  const result: User[] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, password)));

  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

export const getUsers = async () => {
  const result: User[] = await db.select().from(users);
  return result;
};

export const getUser = async (id: string) => {
  const result: User[] = await db.select().from(users).where(eq(users.id, id));
  if (result.length > 0) {
    return result[0];
  } else {
    return null;
  }
};

export const getUserRole = async (id: string): Promise<string> => {
  const result: User[] = await db.select().from(users).where(eq(users.id, id));
  if (result.length > 0) {
    return result[0].role;
  } else {
    return "user";
  }
};

export const insertUser = async (data: User) => {
  return db.insert(users).values(data);
};

export const updateUser = async (data: User) => {
  return db.update(users).set(data);
};

export const deleteUser = async (data: User) => {
  return db.delete(users).where(eq(users.id, data.id));
};
