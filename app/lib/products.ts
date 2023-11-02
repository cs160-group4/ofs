import { db } from "@/db/db";
import { productCategories, products } from "@/db/schema";
import { asc, desc, eq, sql } from "drizzle-orm";
import { Categories } from "@/lib/categories";

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductCategory = {
  products: Product;
  product_categories: Categories;
};

export type productBrand = {
  brand: string;
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

// get all products with category
export const getProductsCategory = async (): Promise<ProductCategory[]> => {
  const result = await db
    .select()
    .from(products)
    .orderBy(sql`rand()`)
    .leftJoin(productCategories, eq(productCategories.id, products.categoryId));
  return result as ProductCategory[];
};
// get all featured products
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
export const getProductByCategoryName = async (
  category: string,
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
    .where(sql`${productCategories.name} LIKE ${category}`)
    .orderBy(priceOrder, nameOrder);
  return result;
};

// add a product
export const insertProduct = async (data: NewProduct) => {
  return db.insert(products).values(data);
};

// update product
export const updateProduct = async (data: Product) => {
  return await db.update(products).set(data).where(eq(products.id, data.id));

  // return await db
  // .update(products)
  // .set({
  //   name: data.name,
  //   description: data.description,
  //   slug: data.slug,
  //   brand: data.brand,
  //   categoryId: data.categoryId,
  //   picture: data.picture,
  //   itemWeight: data.itemWeight,
  //   itemPrice: data.itemPrice,
  //   itemQuantity: data.itemQuantity,
  // })
  // .where(eq(products.id, data.id));
};

// delete product
export const deleteProduct = async (id: number) => {
  return db.delete(products).where(eq(products.id, id));
};
