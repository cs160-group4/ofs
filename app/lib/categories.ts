import { db } from "@/db/db";

import { eq, sql } from "drizzle-orm";
import { productCategories } from "drizzle/schema";

// get all categories
export const getCategories = async () => {
  return await db.select().from(productCategories);
};

// get category by id
export const getCategoryById = async (id: number) => {
  const result = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.id, id))
    .limit(1);
  return result[0].name;
};

// add a category
export const addCategory = async (data: any) => {
  return await db.insert(productCategories).values(data);
};

// delete category
export const deleteCategory = async (id: number) => {
  return await db.delete(productCategories).where(eq(productCategories.id, id));
};

// update category
export const updateCategory = async (id: number, data: any) => {
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
