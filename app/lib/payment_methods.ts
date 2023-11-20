import { db } from "@/db/db";
import { paymentMethods } from "@/db/schema";
import { eq } from "drizzle-orm";

export type PaymentMethod = typeof paymentMethods.$inferSelect;
export type NewPaymentMethod = typeof paymentMethods.$inferInsert;

// get payment methods by user id
export const getPaymentMethod = async (user_id: string) => {
  return await db.select().from(paymentMethods).where(eq(paymentMethods.userId, user_id)) as PaymentMethod[];
};

// add a payment method to user
export const addPaymentMethod = async (data: NewPaymentMethod) => {
  return await db.insert(paymentMethods).values(data);
};