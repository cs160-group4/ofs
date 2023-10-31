import { db } from "@/db/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Comments = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
// get all comments
export const getComments = async () => {
  return await db.select().from(comments).limit(5);
};

// get comment by id
export const getCommentById = async (id: number) => {
  const result = await db
    .select()
    .from(comments)
    .where(eq(comments.id, id))
    .limit(1);
  return result[0];
};

// get comments by product id
export const getCommentsByProductId = async (productId: number) => {
  const result: Comments[] = await db
    .select()
    .from(comments)
    .where(eq(comments.productId, productId));
  return result;
};

// get comments by user id
export const getCommentsByUserId = async (userId: string) => {
  const result: Comments[] = await db
    .select()
    .from(comments)
    .where(eq(comments.userId, userId));
  return result;
};

// add a comment to product
export const addComment = async (data: NewComment) => {
  return await db.insert(comments).values(data);
};

// delete comment
export const deleteComment = async (id: number) => {
  return await db.delete(comments).where(eq(comments.id, id));
};

// update comment
export const updateComment = async (id: number, data: NewComment) => {
  return await db.update(comments).set(data).where(eq(comments.id, id));
};

// delete all comments of the product
export const deleteAllComments = async (productId: number) => {
  return await db.delete(comments).where(eq(comments.productId, productId));
};
