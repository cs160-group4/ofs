import { db } from '@/db/db';
import { products } from "@/db/schema";
import { eq } from 'drizzle-orm';

export type Product = typeof products.$inferSelect


export const getProducts = async () => {
    const result: Product[] = await db.select().from(products);
    return result;
}

export const getProductsLimit = async (limit: number) => {
    const result: Product[] = await db.select().from(products).limit(limit);
    return result;
}

export const getProductById = async (p_id: number) : Promise<Product> =>{
    const result: Product[] = await db.select().from(products).where(eq(products.id, p_id));
    return result[0];
}

export const getProductByCategory = async (category: string) => {
    const result: Product[] = await db.select().from(products).where(eq(products.category, category));
    return result;
}

export const insertProduct = async (data: Product) => {
    return db.insert(products).values(data);
}

const updateProduct = async (data: Product) => {
    return db.update(products).set(data);
}

export const deleteProduct = async (data: Product) => {
    return db.delete(products).where(eq(products.id, data.id));
}
