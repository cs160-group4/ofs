'use server'
import { z } from 'zod'
import { Product, deleteProduct, insertProduct } from '../lib/products'
import { revalidatePath } from 'next/cache'
import { deleteReview } from '../lib/reviews';


function formatDate(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

export async function createProduct(prevState: any, formData: FormData) {
    const currentDateTime = new Date();
    const formattedDateTime = formatDate(currentDateTime);
    
    try {
        const schema = z.object({
            name: z.string().min(1).max(40).trim(),
            description: z.string().min(0).max(100),
            slug: z.string().min(1).max(50).trim().toLowerCase(),
            // store: z.string().min(1).max(30),
            brand: z.string().min(1).max(30),
            categoryId: z.number().int(),
            picture: z.string().min(0).max(100),
            itemWeight: z.number().positive(),
            itemPrice: z.string(),
            itemQuantity: z.number().int().positive(),
            createdAt: z.string(),
            updatedAt: z.string(),
        })
    
        const result = schema.safeParse({
            name: formData.get('name'),
            description: formData.get('description'),
            slug: formData.get('slug'),
            brand: formData.get('brand'),
            categoryId: Number(formData.get('category_id')),
            picture: formData.get('picture'),
            itemWeight: Number(formData.get('itemWeight')),
            itemPrice: formData.get('itemPrice'),
            itemQuantity: Number(formData.get('itemQuantity')),
            createdAt: formattedDateTime,
            updatedAt: formattedDateTime
        })
        if(result.success)
        {
            await insertProduct(result.data)
            revalidatePath('/')
            return { success: true, message: result.data.name + ' Successfully Added'}
        }
        else {
            return {success: false, error: result.error.format()}
        }
    }
    catch(error) {
        return {success: false, message: "Product Failed to be Added"}
    }
}

// delete product and all dependent reviews
// may separate into different functions
export async function removeProduct(prod:Product, formData: FormData){
    try {
        await deleteReview(prod.id)
        await deleteProduct(prod)
    } catch (error) {
        console.log(error)
    }
    revalidatePath('/')
}