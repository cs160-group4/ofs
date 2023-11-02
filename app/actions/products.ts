"use server";
import { Product, updateProduct } from "@/lib/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
const FormSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(40),
  description: z.string().min(0).max(100),
  slug: z.string().min(1).max(50),
  // store: z.string().min(1).max(30),
  brand: z.string().min(1).max(30),
  categoryId: z.number().int(),
  picture: z.string().min(0).max(100),
  itemWeight: z.number().positive(),
  itemPrice: z.string(),
  itemQuantity: z.number().int().positive(),
  updatedAt: z.string().min(1).max(30),
  createdAt: z.string().min(1).max(30),
});

export type ProductState = {
  errors?: {
    productId?: string[];
    status?: string[];
  };
  message?: string | null;
};

const UpdateProduct = FormSchema.omit({ createdAt: true });

// export async function editProduct(prevState: ProductState, formData: FormData) {
//   const validatedFields = UpdateProduct.safeParse({
//     id: Number(formData.get("id")),
//     name: formData.get("name"),
//     description: formData.get("description"),
//     slug: formData.get("slug"),
//     brand: formData.get("brand"),
//     categoryId: Number(formData.get("category_id")),
//     picture: formData.get("picture"),
//     itemWeight: Number(formData.get("itemWeight")),
//     itemPrice: formData.get("itemPrice"),
//     itemQuantity: Number(formData.get("itemQuantity")),
//     updatedAt: new Date().toISOString(),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: "Missing Fields. Failed to Update Product.",
//     };
//   }

//   const product: Product = { ...validatedFields.data };
//   try {
//     await updateProduct(product);
//   } catch (error) {
//     return { message: "Database Error: Failed to Update Product." };
//   }

//   revalidatePath("/admin/products");
//   redirect("/admin/products");
// }
