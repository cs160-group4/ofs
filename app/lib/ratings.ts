import { db } from '@/db/db';
import { ratings } from "@/db/schema";
import { eq, sql } from 'drizzle-orm';


export type Rating = typeof ratings.$inferSelect

// get all ratings
export const getRatings = async () => {
    return await db.select().from(ratings);
}

// get rating by product id
export const getProductAverageRating = async (productId: number) => {
    const result = await db.select({ avg: sql`AVG(${ratings.ratingValue})` })
        .from(ratings).where(eq(ratings.productId, productId));
    
    return  result[0].avg;
}

// get rating by user id
export const getUserRating = async (userId: string) => {
    const result = await db.select().from(ratings).where(eq(ratings.userId, userId));
    return result;
}

// add a rating to product
export const addRating = async (data: Rating) => {
    return await db.insert(ratings).values(data);
}

// delete rating
export const deleteRating = async (id: number) => {
    return await db.delete(ratings).where(eq(ratings.id, id));
}

// update rating
export const updateRating = async (id: number, data: Rating) => {
    return await db.update(ratings).set(data).where(eq(ratings.id, id));
}