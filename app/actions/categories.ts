"use server";
import {
  addCategory,
  deleteCategory,
  isCategoryNameExisting,
  isCategoryNameExistingExcept,
  isCategorySlugExisting,
  isCategorySlugExistingExcept,
  updateCategory,
} from "@/lib/categories";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const categoryNameRegex: RegExp = /^[a-zA-Z0-9\s]+$/;
const slugRegex: RegExp = /^[a-z0-9-]+$/;

const FormSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(50),
  slug: z.string().min(1).max(50),
  description: z.string().max(100),
  image: z.string().optional(),
});

const Create = FormSchema.pick({
  name: true,
  slug: true,
  description: true,
  image: true,
});

export async function createCategoryAction(prevState: any, formData: FormData) {
  try {
    const fields = Create.safeParse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
    });

    if (!fields.success) {
      return {
        errors: fields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Create Category",
      };
    }

    let isNameExisting = await isCategoryNameExisting(fields.data.name);
    let isSlugExisting = await isCategorySlugExisting(fields.data.slug);

    const errors: any = {};
    let isNameValid = fields.data.name.match(categoryNameRegex);
    let isSlugValid = fields.data.slug.match(slugRegex);
    if (!isNameValid) {
      errors.name = ["Category name must be letters, numbers, and spaces."];
    }

    if (!isSlugValid) {
      errors.slug = [
        "Category slug must be lowercase letters, numbers, and dashes.",
      ];
    }
    if (isNameExisting) {
      errors.name = ["Category name already exists"];
    }

    if (isSlugExisting) {
      errors.slug = ["Category slug already exists"];
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        message: "Failed to Create Category",
      };
    }
    fields.data.slug = fields.data.slug.toLowerCase();
    const result = await addCategory(fields.data);
  } catch (error) {
    return { message: "Database Error: Failed to Create Category" };
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories?status=created");
}

const UpdateCategory = FormSchema.pick({
  id: true,
  name: true,
  slug: true,
  description: true,
  image: true,
});

export async function editCategoryAction(prevState: any, formData: FormData) {
  try {
    const fields = UpdateCategory.safeParse({
      id: Number(formData.get("id")),
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
    });

    if (!fields.success) {
      return {
        errors: fields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Update Category",
      };
    }
    const errors: any = {};
    let isNameValid = fields.data.name.match(categoryNameRegex);
    let isSlugValid = fields.data.slug.match(slugRegex);
    if (!isNameValid) {
      errors.name = ["Category name must be letters, numbers, and spaces."];
    }

    if (!isSlugValid) {
      errors.slug = [
        "Category slug must be lowercase letters, numbers, and dashes.",
      ];
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        message: "Failed to Update Category",
      };
    }
    const id = fields.data.id;

    let isNameExisting = await isCategoryNameExistingExcept(
      id,
      fields.data.name
    );
    let isSlugExisting = await isCategorySlugExistingExcept(
      id,
      fields.data.slug
    );

    if (isNameExisting) {
      errors.name = ["Category name already exists"];
    }
    if (isSlugExisting) {
      errors.slug = ["Category slug already exists"];
    }

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        message: "Failed to Update Category",
      };
    }
    fields.data.slug = fields.data.slug.toLowerCase();
    const result = await updateCategory(id, fields.data);
  } catch (error) {
    return { message: "Database Error: Failed to Update Category" };
  }
  revalidatePath("/admin/categories");
  redirect("/admin/categories?status=updated");
}

const DeleteCategory = FormSchema.pick({ id: true });

export async function deleteCategoryAction(prevState: any, formData: FormData) {
  try {
    const validatedFields = DeleteCategory.safeParse({
      id: Number(formData.get("id")),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Delete Category",
      };
    }
    const id: number = validatedFields.data.id as number;
    const result = await deleteCategory(id);
  } catch (error) {
    return { message: "Database Error: Failed to Delete Category" };
  }
  revalidatePath("/admin/categories");
  redirect("?status=deleted");
}
