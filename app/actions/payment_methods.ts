"use server"
import { z } from "zod";
import { getPaymentMethod, addPaymentMethod } from "../lib/payment_methods";
import { revalidatePath } from "next/cache";

export async function getAllPaymentMethods(id: string){
  try {
    const res = await getPaymentMethod(id);
    return { success: true, message: "Payment Methods retrieved successfully", data: res }
  } catch (error) {
    return { success: false, message: "Error: failed to get all Payment Methods"}
  }
}

export async function addNewPaymentMethod(formData: FormData) {
  const schema = z.object({
    userId: z.string(),
    cardNumber: z.string(),
    expirationDate: z.string(),
    cvv: z.string()
  })
  
  try {
    const card = schema.safeParse({
      userId: formData.get("userId"),
      cardNumber: formData.get("cardNumber"),
      expirationDate: formData.get("expirationDate"),
      cvv: formData.get("cvv")
    });

    if(card.success) {
      const res = await addPaymentMethod(card.data);
      revalidatePath("/");
      return { success: true, message: "Payment Method successfully added" }
    } else {
      return { success: false, message: "Payment Method failed to be added" }
    }
  } catch (error) {
    return { success: false, message: "Error: failed to add new Payment Method" }
  }
}