import { db } from "@/db/db";
import { products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { reviews } from "drizzle/schema";

export type Product = typeof products.$inferSelect;
export type ProductInsert = {
  name: string;
  description: string;
  slug: string | null;
  brand: string;
  categoryId: number;
  picture: string;
  itemWeight: number;
  itemPrice: string;
  itemQuantity: number;
};

export const getProducts = async () => {
  const result: Product[] = await db.select().from(products);
  return result;
};

export const getProductsLimit = async (limit: number) => {
  const result: Product[] = await db.select().from(products).limit(limit);
  return result;
};

export const getProductById = async (p_id: number): Promise<Product> => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.id, p_id));
  return result[0];
};

export const getProductByName = async (
  p_name: string = ""
): Promise<Product[]> => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(sql`${products.name} LIKE ${p_name}`)
    .limit(5);
  return result;
};

export const getProductByCategory = async (category: number) => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.categoryId, category));
  return result;
};

export const insertProduct = async (data: ProductInsert) => {
  return db.insert(products).values(data);
};

const updateProduct = async (data: Product) => {
  return db.update(products).set(data);
};

export const deleteProduct = async (data: Product) => {
  return db.delete(products).where(eq(products.id, data.id));
};
