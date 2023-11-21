import { db } from "@/db/db";
import { blogPosts, user } from "@/db/schema";
import { User } from "@/lib/users";
import { desc, eq } from "drizzle-orm";

export type Post = typeof blogPosts.$inferSelect;
// get all blog posts
export const getBlogPosts = async () => {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.createdAt));
  return posts as Post[];
};

export const getBlogPostsWithAuthor = async () => {
  const posts = await db
    .select()
    .from(blogPosts)
    .leftJoin(user, eq(blogPosts.userId, user.id))
    .where(eq(blogPosts.status, "published"))
    .orderBy(desc(blogPosts.createdAt));

  return posts as { blog_posts: Post; user: User }[];
};

export function getPostById(id: number) {
  return db
    .select()
    .from(blogPosts)
    .leftJoin(user, eq(blogPosts.userId, user.id))
    .where(eq(blogPosts.id, id))
    .limit(1)
    .then((list) => list[0] as { blog_posts: Post; user: User });
}
