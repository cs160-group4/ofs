'use server'
import { z } from 'zod'
import { Product, deleteProduct, insertProduct } from './lib/products'
import { revalidatePath } from 'next/cache'


function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

export async function createProduct(formData: FormData) {
    const currentDateTime = new Date();
    const formattedDateTime = formatDate(currentDateTime);
    
    const schema = z.object({
        id: z.number().int(),
        name: z.string().min(1).max(40),
        description: z.string().min(1).max(100),
        store: z.string().min(1).max(30),
        category: z.string().min(1).max(30),
        picture: z.string().min(1).max(100),
        itemWeight: z.number().positive(),
        itemPrice: z.string(),
        itemQuantity: z.number().int().positive(),
        createdAt: z.string(),
        updatedAt: z.string(),
    })

    const data = schema.parse({
        id: 0,
        name: formData.get('name'),
        description: formData.get('description'),
        store: formData.get('store'),
        category: formData.get('category'),
        picture: formData.get('picture'),
        itemWeight: Number(formData.get('itemWeight')),
        itemPrice: formData.get('itemPrice'),
        itemQuantity: Number(formData.get('itemQuantity')),
        createdAt: formattedDateTime,
        updatedAt: formattedDateTime
    })
    try {
        await insertProduct(data)
    } catch (error) {
        console.log(error)
    }
    revalidatePath('/')
}

export async function removeProduct(prod:Product, formData: FormData){
    try {
        await deleteProduct(prod)
    } catch (error) {
        console.log(error)
    }
    revalidatePath('/')
}