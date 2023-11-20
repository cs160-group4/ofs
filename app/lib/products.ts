import { db } from "@/db/db";
import { productCategories, products } from "@/db/schema";
import { Categories } from "@/lib/categories";
import { asc, desc, eq, like, or, sql } from "drizzle-orm";

/*
  Authors: Hung Pham <mryo.hp@gmail.com>, Aaron Low <aaron.c.low@sjsu.edu>, Kyle Chen <kyle.chen@sjsu.edu>, Fariha Ahmed <fariha.ahmed@sjsu.edu>
  Copyright (c) 2023. All rights reserved.
*/

// type for product - by Hung Pham
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductCategory = {
  products: Product;
  product_categories: Categories;
};

// type for product brand - by Aaron Low
export type productBrand = {
  brand: string;
};

// get all products - by Hung Pham
export const getProducts = async (): Promise<Product[]> => {
  const result: Product[] = await db.select().from(products);
  return result;
};

// get product count - by Hung Pham
export const getProductCount = async (): Promise<number> => {
  const result: Product[] = await db.select().from(products);
  return result.length;
};

// get all products with category - by Hung Pham
export const getProductsCategory = async (): Promise<ProductCategory[]> => {
  const result = await db
    .select()
    .from(products)
    .orderBy(sql`rand()`)
    .leftJoin(productCategories, eq(productCategories.id, products.categoryId));
  return result as ProductCategory[];
};
// get all featured products - by Hung Pham
export const getFeaturedProducts = async () => {
  // select random 3 products
  const result = await db
    .select()
    .from(products)
    .orderBy(sql`rand()`)
    .limit(3)
    .leftJoin(productCategories, eq(productCategories.id, products.categoryId));
  return result as ProductCategory[];
};

// get all products with limit - by Hung Pham
export const getProductsLimit = async (limit: number) => {
  const result: Product[] = await db.select().from(products).limit(limit);
  return result;
};

// get products by query - by Kyle Chen
export const getFilteredProduct = async (
  query: string
) => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(or(
      like(products.name, `%${query}%`),
      like(products.id, `%${query}%`),
      like(products.slug, `%${query}%`),
      like(products.description, `%${query}%`),
      like(products.brand, `%${query}%`)
    ))
    .orderBy(asc(products.id), asc(products.createdAt))

  return result;
};

// get product by id - by Hung Pham
export const getProductById = async (p_id: number): Promise<Product> => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.id, p_id));
  return result[0];
};

// get product by category - by Hung Pham
export const getProductByCategory = async (category: number) => {
  const result: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.categoryId, category));
  return result;
};

// update product = by Hung Pham
export const updateProduct = async (data: Product) => {
  return await db.update(products).set(data).where(eq(products.id, data.id));
};

// get product by name - by Aaron Low
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

// get product by category name - by Aaron Low
export const getProductByCategoryName = async (
  slug: string,
  priceSort: string,
  nameSort: string
) => {
  if (priceSort === "ASC") var priceOrder = asc(products.itemPrice);
  else var priceOrder = desc(products.itemPrice);

  if (nameSort === "ASC") var nameOrder = asc(products.name);
  else var nameOrder = desc(products.name);

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
    .where(sql`${productCategories.slug} LIKE ${slug}`)
    .orderBy(priceOrder, nameOrder);
  return result;
};

// add a product - by Kyle Chen
export const insertProduct = async (data: NewProduct) => {
  return db.insert(products).values(data);
};

// delete product - by Kyle Chen
export const deleteProduct = async (id: number) => {
  return db.delete(products).where(eq(products.id, id));
};

// update product in cart - by Fariha
export const updateProductQuantity = async (id: number, quantity: number) => {
  return await db.update(products).set({itemQuantity: quantity}).where(eq(products.id, id));
};
