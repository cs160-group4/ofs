"use server";
import { z } from "zod";
import { Product, deleteProduct, insertProduct } from "./lib/products";
import { addAddress, deleteAddress } from "./lib/addresses";
import { revalidatePath } from "next/cache";
import { deleteReview } from "./lib/reviews";

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export async function createProduct(formData: FormData) {
  const currentDateTime = new Date();
  const formattedDateTime = formatDate(currentDateTime);
  const priceEx = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d{9})?(\.\d{1,2})?$/gm

  const schema = z.object({
    name: z.string().min(1).max(40),
    description: z.string().min(0).max(100),
    slug: z.string().min(1).max(50).trim().toLowerCase(),
    // store: z.string().min(1).max(30),
    brand: z.string().min(1).max(30),
    categoryId: z.number().int(),
    picture: z.string().min(0).max(100),
    itemWeight: z.number().positive(),
    itemPrice: z.string().regex(priceEx),
    itemQuantity: z.number().int().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });

  try {
    const result = schema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      slug: formData.get("slug"),
      // store: formData.get('store'),
      brand: formData.get("brand"),
      categoryId: Number(formData.get("category_id")),
      picture: formData.get("picture"),
      itemWeight: Number(formData.get("itemWeight")),
      itemPrice: formData.get("itemPrice"),
      itemQuantity: Number(formData.get("itemQuantity")),
      createdAt: formattedDateTime,
      updatedAt: formattedDateTime,
    });

    if(result.success)
    {
      await insertProduct(result.data);
      revalidatePath("/");
      return { success: true, message: result.data.name + ' Added Successfully'}
    }
    else{
      console.log(result.error)
      return { success: false, message: "Product Failed To Be Added"}
    }
  }
  catch(error) {
    return {success: false, err: true, message: "Product Failed To Be Added"}
  }
}

// delete product and all dependent reviews
// may separate into different functions
export async function removeProduct(formData: FormData) {
  try {
    const id = Number(formData.get("id"));
    await deleteProduct(id);
    revalidatePath("/admin/products");
    return { message: "Deleted Product" };
  } catch (error) {
    return {
      message: "Database Error: Failed to Remove Product",
    };
  }
}

// Fariha - 11/03/23
export async function addNewAddress(formData: FormData) {
  const schema = z.object({
    addressLine1: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    addressLine2: z.string(),
    userId: z.string()
  });

  try {
    const newAddress = schema.safeParse({
      addressLine1: formData.get("addressLine1"),
      city: formData.get("city"),
      state: formData.get("state"),
      postalCode: formData.get("postalCode"),
      addressLine2: formData.get("addressLine2"),
      userId: formData.get("userId")
    });

    if(newAddress.success)
    {
      await addAddress(newAddress.data);
      revalidatePath("/profile");
      return { success: true, message: "Address added successfully"}
    }
    else{
      console.log(newAddress.error);
      return { success: false, message: "Address failed to be added"}
    }

  } catch (error) {
    return {success: false, err: true, message: "Error: Address failed to be added"}
  }
}
