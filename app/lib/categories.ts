import { db } from "@/db/db";

import { eq, sql } from "drizzle-orm";
import { productCategories } from "drizzle/schema";



export const getCategoryById = async (id: number) => {
  const result = await db
    .select()
    .from(productCategories)
    .where(eq(productCategories.id, id)).limit(1);
  return result[0].name;
}