import { db } from "@/db/db";
import { eq, sql, or, like, asc, not, and } from "drizzle-orm";
import { productCategories } from "drizzle/schema";
import { ITEMS_PER_PAGE } from "@/lib/utils";

export type Categories = typeof productCategories.$inferSelect;
export type NewCategory = typeof productCategories.$inferInsert;

// get all categories
export const getCategories = async () => {
  return await db.select().from(productCategories);
};

/* get category by id */
export const getCategoryById = async (id: number) => {
  let result = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.id, id))
    .limit(1);
  return result[0];
};

// get category name by id
export const getCategoryNameById = async (id: number) => {
  const result = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.id, id))
    .limit(1);
  return result[0].name;
};

// get category pages
export const getCategoriesPages = async (query: string): Promise<number> => {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(productCategories);
    const count = result[0].count;
    const pages: number = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
};

// get filtered categories
export const getFilteredCategories = async (
  query: string,
  currentPage: number
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // get all categories that match the query (like category name and description)
  const result: Categories[] = await db
    .select()
    .from(productCategories)
    .where(
      or(
        like(productCategories.name, `%${query}%`),
        like(productCategories.slug, `%${query}%`),
        like(productCategories.description, `%${query}%`)
      )
    )
    .orderBy(asc(productCategories.createdAt))
    .limit(10)
    .offset(offset);
  return result;
};

// Check if category name exists
export const isCategoryNameExisting = async (name: string) => {
  const result = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.name, name))
    .limit(1);
  return result.length > 0;
};

// Check if category slug exists
export const isCategorySlugExisting = async (slug: string) => {
  const result = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.slug, slug))
    .limit(1);
  return result.length > 0;
};

// Check if category name exists except for the current category
export const isCategoryNameExistingExcept = async (
  id: number,
  name: string
) => {
  const result = await db
    .select()
    .from(productCategories)
    .where(
      and(eq(productCategories.name, name), not(eq(productCategories.id, id)))
    )
    .limit(1);
  return result.length > 0;
};

// Check if category slug exists except for the current category
export const isCategorySlugExistingExcept = async (
  id: number,
  slug: string
) => {
  const result = await db
    .select()
    .from(productCategories)
    .where(
      and(eq(productCategories.slug, slug), not(eq(productCategories.id, id)))
    )
    .limit(1);
  return result.length > 0;
};

// add a category
export const addCategory = async (data: NewCategory) => {
  return await db.insert(productCategories).values(data);
};

// delete category
export const deleteCategory = async (id: number) => {
  return await db.delete(productCategories).where(eq(productCategories.id, id));
};

// update category
export const updateCategory = async (id: number, data: NewCategory) => {
  return await db
    .update(productCategories)
    .set(data)
    .where(eq(productCategories.id, id));
};

// delete all categories
export const deleteAllCategories = async () => {
  return await db.delete(productCategories);
};

// get category by name
export const getCategoryByName = async (name: string) => {
  return await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.name, name));
};
