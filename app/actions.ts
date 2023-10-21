'use server'
import { z } from 'zod'
import { Product, deleteProduct, insertProduct } from './lib/products'
import { revalidatePath } from 'next/cache'


export async function createProduct(formData: FormData) {
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
        createdAt: z.null(),
        updatedAt: z.null(),
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
        createdAt: null,
        updatedAt: null
        // id:0, 
        // name: "123", 
        // description: "123", 
        // store: "123", 
        // category: "123", 
        // picture: "123",
        // itemWeight: 1,
        // itemPrice: "1.0",
        // itemQuantity: 2,
        // createdAt: null,
        // updatedAt: null,
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