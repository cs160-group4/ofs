import { db } from '@/db/db';
import { users } from "@/db/schema";
import { eq } from 'drizzle-orm';

export type User = typeof users.$inferSelect

export const authenticate = async (email: string, password: string) => {
    const result: User[] = await db.select().from(users).where(eq(users.email, email)).where(eq(users.password, password));
    if (result.length > 0) {
        return result[0];
    } else {
        return null;
    }
}

export const getUsers = async () => {
    const result: User[] = await db.select().from(users);
    return result;
}

const insertUser = async (data: User) => {
    return db.insert(users).values(data);
}

const updateUser = async (data: User) => {
    return db.update(users).set(data);
}

const deleteUser = async (data: User) => {
    return db.delete(users).where(eq(users.id, data.id));
}
