import { db } from '@/db/db';
import { reviews } from "@/db/schema"; 


export type Review = typeof reviews.$inferSelect

export const getReviews = async (limit: number = 10) => {
    const result: Review[] = await db.select().from(reviews).limit(limit);
    return result;
}

