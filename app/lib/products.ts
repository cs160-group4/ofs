import { db } from '@/db/db';
import { products } from "@/db/schema";
import { eq } from 'drizzle-orm';

export type Product = typeof products.$inferSelect


export const getProducts = async () => {
    const result: Product[] = await db.select().from(products);
    return result;
}

export const getProductById = async (id: number) => {
    const result: Product[] = await db.select().from(products).where(eq(products.id, id));
    return result;
}

const insertProduct = async (data: Product) => {
    return db.insert(products).values(data);
}

const updateProduct = async (data: Product) => {
    return db.update(products).set(data);
}

const deleteProduct = async (data: Product) => {
    return db.delete(products).where(eq(products.id, data.id));
}
