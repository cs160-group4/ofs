import { db } from "@/db/db";
import { productCategories, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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

// get all products
export const getProducts = async (): Promise<Product[]> => {
  const result: Product[] = await db.select().from(products);
  return result;
};

// get product count
export const getProductCount = async (): Promise<number> => {
  const result: Product[] = await db.select().from(products);
  return result.length;
};

// get all featured products
export const getFeaturedProducts = async () => {
  // select random 3 products
  const result: Product[] = await db
    .select()
    .from(products)
    .orderBy(sql`rand()`)
    .limit(3);
  return result;
};

// get all products with limit
export const getProductsLimit = async (limit: number) => {
  const result: Product[] = await db.select().from(products).limit(limit);
  return result;
};

// get product by id
export const getProductById = async (p_id: number): Promise<Product> => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.id, p_id));
  return result[0];
};

// get product by name
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

// get product by category
export const getProductByCategory = async (category: number) => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.categoryId, category));
  return result;
};

// get product by category name
export const getProductByCategoryName = async (category: string) => {
  const result: Product[] = await db
    .select({
      id: products.id,
      name: products.name,
      slug: productCategories.slug,
      brand: products.brand,
      description: products.description,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      categoryId: products.categoryId,
      picture: products.picture,
      itemWeight: products.itemWeight,
      itemPrice: products.itemPrice,
      itemQuantity: products.itemQuantity,
    })
    .from(products)
    .leftJoin(productCategories, eq(productCategories.id, products.categoryId))
    .where(eq(productCategories.slug, category));
  return result;
};

// add a product
export const insertProduct = async (data: ProductInsert) => {
  return db.insert(products).values(data);
};

// update product
const updateProduct = async (data: Product) => {
  return db.update(products).set(data);
};

// delete product
export const deleteProduct = async (data: Product) => {
  return db.delete(products).where(eq(products.id, data.id));
};
