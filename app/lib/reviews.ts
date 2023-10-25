import { db } from '@/db/db';
import { reviews } from "@/db/schema";
import { eq } from 'drizzle-orm';


export type Review = typeof reviews.$inferSelect

export const getReviews = async (limit: number = 10) => {
    const result: Review[] = await db.select().from(reviews).limit(limit);
    return result;
}


export const postReview = async (id: number) => {
    const result: Review[] = await db.select().from(reviews).where({id: id});
    return result;
}


export const deleteReview = async (id: number) => {
    return db.delete(reviews).where(eq(reviews.id, id));
}

