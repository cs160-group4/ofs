import { db } from "@/db/db";
import { ratings } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;
// get all ratings
export const getRatings = async () => {
  return await db.select().from(ratings);
};
// get rating by product id
export const getRatingsByProductId = async (productId: number) => {
  return await db
    .select()
    .from(ratings)
    .where(eq(ratings.productId, productId));
};
// get average rating of product
export const getProductAverageRating = async (productId: number) => {
  const result = await db
    .select({ avg: sql`AVG(${ratings.ratingValue})` })
    .from(ratings)
    .where(eq(ratings.productId, productId));
  return result[0].avg ?? 0;
};

// get rating by user id
export const getUserRating = async (userId: string) => {
  const result = await db
    .select()
    .from(ratings)
    .where(eq(ratings.userId, userId));
  return result;
};

// Get Product Rating by User Id
export const getProductRatingByUserId = async (
  userId: string,
  productId: number
) => {
  const result = await db
    .select()
    .from(ratings)
    .where(and(eq(ratings.userId, userId), eq(ratings.productId, productId)));
  return result[0]?.ratingValue ?? 0;
};

export const rateProduct = async (
  userId: string,
  productId: number,
  ratingValue: number
) => {
  const result = await db
    .select()
    .from(ratings)
    .where(eq(ratings.productId, productId))
    .where(eq(ratings.userId, userId));
  if (result.length === 0) {
    let newRating: NewRating = {
      userId,
      productId,
      ratingValue,
    };
    await addRating(newRating);
  } else {
    let newRating: NewRating = {
      userId,
      productId,
      ratingValue,
    };
    await updateRating(result[0].id, newRating);
  }
};

// add a rating to product
export const addRating = async (data: NewRating) => {
  return await db.insert(ratings).values(data);
};

// delete rating
export const deleteRating = async (id: number) => {
  return await db.delete(ratings).where(eq(ratings.id, id));
};

// update rating
export const updateRating = async (id: number, data: NewRating) => {
  return await db.update(ratings).set(data).where(eq(ratings.id, id));
};
