import { db } from "@/db/db";
import { comments, user, products } from "@/db/schema";
import { eq, like, sql, or } from "drizzle-orm";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { Product } from "@/lib/products";
import { User } from "@/lib/users";

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

// get comments
export const getCommentsPages = async (query: string): Promise<number> => {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(comments);
    const count = result[0].count;
    const pages: number = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
};

// get filtered comments
export const getFilteredComments = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const result = await db
    .select()
    .from(comments)
    .leftJoin(products, eq(comments.productId, products.id))
    .leftJoin(user, eq(comments.userId, user.id))
    .where(
      or(
        like(comments.text, `%${query}%`),
        like(user.name, `%${query}%`),
        like(products.name, `%${query}%`)
      )
    )
    .limit(10)
    .offset(offset);
  return result as { comments: Comments; products: Product; user: User}[];
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
