'use server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { updateOrderDeliveryStatus } from "@/lib/orders";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

const FormSchema = z.object({
    id: z.number(),
    deliveryStatus: z.string().min(1).max(20),
  });

const UpdatePick = FormSchema.pick({ id: true, deliveryStatus: true });

export async function editDeliveryStatusAction(prevState: any, formData: FormData) {
    console.log("editDeliveryStatusAction");
    try {
      const validatedFields = UpdatePick.safeParse({
        id: Number(formData.get("id")),
        deliveryStatus: formData.get("deliveryStatus"),
      });
  
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Missing Fields. Failed to update order.",
        };
      }
      const { id, deliveryStatus } = validatedFields.data;
      const result = await updateOrderDeliveryStatus(id, deliveryStatus);
    } catch (error) {
      return { message: "Database Error: Failed to update Delivery ." };
    }
  
    revalidatePath("/admin/orders");
    redirect("/admin/orders?status=updated");
  }