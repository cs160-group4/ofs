import { db } from '@/db/db';
import { comments } from "@/db/schema";
import { eq } from 'drizzle-orm';


export type Comments = typeof comments.$inferSelect

export const getCommentsByProductId = async (productId: number) => {
    const result: Comments[] = await db.select().from(comments).where(eq(comments.productId, productId));
    return result;
}
