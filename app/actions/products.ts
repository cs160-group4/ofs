"use server";
import { Product, updateProduct } from "@/lib/products";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
const FormSchema = z.object({
  id: z.number().int(),
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
});

export type State = {
  errors?: {
    productId?: string[];
    status?: string[];
  };
  message?: string | null;
};

const UpdateProduct = FormSchema.omit({ id: true });

export async function editProduct(prevState: State, formData: FormData) {
  const validatedFields = UpdateProduct.safeParse({
    id: Number(formData.get("id")),
    name: formData.get("name"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    brand: formData.get("brand"),
    categoryId: Number(formData.get("category_id")),
    picture: formData.get("picture"),
    itemWeight: Number(formData.get("itemWeight")),
    itemPrice: formData.get("itemPrice"),
    itemQuantity: Number(formData.get("itemQuantity")),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const product: Product = { ...validatedFields.data };
  try {
    await updateProduct(product);
  } catch (error) {
    return { message: "Database Error: Failed to Update Product." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/admin/products");
}
