import { db } from '@/db/db';
import { reviews } from "@/db/schema";
import { eq } from 'drizzle-orm';


export type Review = typeof reviews.$inferSelect

// get all reviews
export const getReviews = async () => {
    return await db.select().from(reviews);
}

// get all reviews with limit
export const getReviewsWithLimit = async (limit: number) => {
    return await db.select().from(reviews).limit(limit);
}

// get review by id
export const getReview = async (id: number) => {
    return await db.select().from(reviews).where(eq(reviews.id, id));
}

// get review by user id
export const getReviewByUserId = async (user_id: string) => {
    return await db.select().from(reviews).where(eq(reviews.userId, user_id));
}

// get review by product id
export const getReviewByProductId = async (product_id: number) => {
    return await db.select().from(reviews).where(eq(reviews.productId, product_id));
}

// add a review to product
export const addReview = async (data: Review) => {
    return await db.insert(reviews).values(data);
}

// delete review
export const deleteReview = async (id: number) => {
    return await db.delete(reviews).where(eq(reviews.id, id));
}

// update review
export const updateReview = async (id: number, data: Review) => {
    return await db.update(reviews).set(data).where(eq(reviews.id, id));
}


