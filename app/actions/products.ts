"use server";
import { Product, getProductById, updateProduct, updateProductQuantity } from "@/lib/products";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

const currentDateTime = new Date();
const formattedDateTime = formatDate(currentDateTime);
const priceEx = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d{9})?(\.\d{1,2})?$/gm
const slugEx = /^([a-zA-Z]+((-[a-zA-Z]+)?)*)$/gm
const schema = z.object({
  id: z.number().min(1),
  name: z.string().min(1).max(40),
  description: z.string().min(0).max(100),
  slug: z.string().min(1).max(50).trim().toLowerCase().regex(slugEx),
  brand: z.string().min(1).max(30),
  categoryId: z.number().int(),
  picture: z.string().min(0).max(110),
  itemWeight: z.number().positive().lte(200),
  itemPrice: z.string().regex(priceEx),
  itemQuantity: z.number().int().positive().lte(50000),
  createdAt: z.string(),
  updatedAt: z.string(),
});

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

export async function editProduct(formData: FormData, url: string) {
  const result = schema.safeParse({
    id: Number(formData.get("id")),
    name: formData.get("name"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    brand: formData.get("brand"),
    categoryId: Number(formData.get("category_id")),
    picture: url,
    itemWeight: Number(formData.get("itemWeight")),
    itemPrice: formData.get("itemPrice"),
    itemQuantity: Number(formData.get("itemQuantity")),
    updatedAt: formattedDateTime,
    createdAt: formData.get("created")
  });

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
        message: "Failed to Update Product: Missing or Invalid Fields",
      };
    }
  // const product: Product = { ...result.data };
  try
  {
    await updateProduct(result.data);
  }
  catch (error) {
    return { message: "Database Error: Failed to Update Product." };
  }
  // intended action: only revalidates and redirects if no errors are caught by preceding code
  revalidatePath("/admin/products");
  return {
    success: true,
    message: "Update Sucess!"
  }
  // redirect("/admin/products");
}

export async function updateProductItemQuantity(productId: number, cartQuantity: number, expectedVersion: string){
  try {
    const currentVersion =  (await getProductById(productId)).updatedAt;
    const currentStock = (await getProductById(productId)).itemQuantity;

    if (currentVersion !== expectedVersion) {
      if (currentStock >= cartQuantity) {
        await updateProductQuantity(productId, currentStock - cartQuantity);
        return { success: true, message: "Updated product quantity"  };
      } else {
        return { success: false, message: `Product stocks do not match up;\nExpected: ${expectedVersion}; Current: ${currentVersion}` };
      }
    } else {
      await updateProductQuantity(productId, currentStock - cartQuantity);
      return { success: true, message: "Updated Product Quantity" };
    }
  } catch (error) {
    return {
      success: false, message: "Database Error: Failed to update Product Quantity",
    };
  }
}

export async function restoreItemQuantity(productId: number, cartQuantity: number) {
  try {
    const currentStock = (await getProductById(productId)).itemQuantity;
    await updateProductQuantity(productId, currentStock + cartQuantity);
    return { success: true, message: "Updated Product Quantity" };
  } catch (error) {
      return {
        success: false, message: "Database Error: Failed to update Product Quantity",
      };
  }
}