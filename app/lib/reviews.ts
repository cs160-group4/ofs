import { db } from '@/db/db';
import { reviews } from "@/db/schema";
import { eq } from 'drizzle-orm';

/*
  Authors: Hung Pham <mryo.hp@gmail.com>, Kyle Chen <kyle.chen@sjsu.edu>
  Copyright (c) 2023. All rights reserved.
*/

// type for review - by Hung Pham
export type Review = typeof reviews.$inferSelect
export type NewReview = typeof reviews.$inferInsert

// get all reviews - by Hung Pham
export const getReviews = async () => {
    return await db.select().from(reviews);
}

// get all reviews with limit - by Hung Pham
export const getReviewsWithLimit = async (limit: number) => {
    return await db.select().from(reviews).limit(limit);
}

// get review by id - by Hung Pham
export const getReview = async (id: number) => {
    return await db.select().from(reviews).where(eq(reviews.id, id));
}

// get review by user id - by Hung Pham
export const getReviewByUserId = async (user_id: string) => {
    return await db.select().from(reviews).where(eq(reviews.userId, user_id));
}

// get review by product id - by Hung Pham
export const getReviewByProductId = async (product_id: number) => {
    return await db.select().from(reviews).where(eq(reviews.productId, product_id));
}

// add a review to product - by Hung Pham
export const addReview = async (data: NewReview) => {
    return await db.insert(reviews).values(data);
}

// update review - by Hung Pham
export const updateReview = async (id: number, data: NewReview) => {
    return await db.update(reviews).set(data).where(eq(reviews.id, id));
}

// delete review - by Kyle Chen
export const deleteReview = async (id: number) => {
    return await db.delete(reviews).where(eq(reviews.id, id));
}
