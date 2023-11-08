"use server";
import { z } from "zod";
import { Product, deleteProduct, insertProduct } from "./lib/products";
import { addAddress, deleteAddress } from "./lib/addresses";
import { revalidatePath } from "next/cache";
import { deleteReview } from "./lib/reviews";
import { NewEmail, NewPassword, updateNewEmail, updateNewPassword } from "./lib/users";

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

export async function deleteAddressFromDB(formData: FormData) {
  try {
    const id = formData.get("id");
    //await deleteAddress(id);
    revalidatePath("/profile");
    return { message: "Deleted Address" };
  } catch (error) {
    console.log(error);
  }
  revalidatePath('/cart');
}

// Fariha - 11/06/23

// Aaron - 11/07/23
export async function updateEmail(formData: FormData) {
  const schema = z.object({
    newEmail: z.string(),
    confirmEmail: z.string(),
    user_id: z.string()
  });

  try {
    const newEmailForm = schema.safeParse({
      newEmail: formData.get("newEmail"),
      confirmEmail: formData.get("confirmEmail"),
      user_id: formData.get("userId")
    });

    if(newEmailForm.success)
    {
      const data : NewEmail  = newEmailForm.data;
      if (!data.newEmail.includes("@") || !data.confirmEmail.includes("@")) {
        return {
          success: false,
          message: "Error: New Email Does Not Contain @"
        };
      }
      else if (data.newEmail !== data.confirmEmail) {
        return {
          success: false,
          message: "Error: Emails Do Not Match"
        };
      }
      else {
        await updateNewEmail(data);
        revalidatePath("/profile");
        return { success: true, message: "Address updated successfully"}
      }
    }
    else{
      console.log(newEmailForm.error);
      return { success: false, message: "Error: Address failed to be updated"}
    }

  } catch (error) {
    return {success: false, err: true, message: "Error: Address failed to be updated"}
  }
}

export async function updatePassword(formData: FormData) {
  const schema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
    user_id: z.string()
  });

  try {
    const newPasswordForm = schema.safeParse({
      newPassword: formData.get("newPassword"),
      confirmPassword: formData.get("confirmPassword"),
      user_id: formData.get("userId")
    });

    if(newPasswordForm.success)
    {
      const data : NewPassword  = newPasswordForm.data;
      if (data.newPassword !== data.confirmPassword) {
        return {
          success: false,
          message: "Error: Passwords Do Not Match"
        };
      }
      else {
        await updateNewPassword(data);
        revalidatePath("/profile");
        return { success: true, message: "Password updated successfully"}
      }
    }
    else{
      console.log(newPasswordForm.error);
      return { success: false, message: "Error: Password failed to be updated"}
    }

  } catch (error) {
    return {success: false, err: true, message: "Error: Password failed to be updated"}
  }
}