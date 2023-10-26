import { db } from '@/db/db';
import { ratings } from "@/db/schema";
import { eq, sql } from 'drizzle-orm';


export type Rating = typeof ratings.$inferSelect

export const getProductAverageRating = async (productId: number) => {
    const result = await db.select({ avg: sql`AVG(${ratings.ratingValue})` })
        .from(ratings).where(eq(ratings.productId, productId));
    
    return  result[0].avg;
}