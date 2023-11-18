import { getOrderCount, getOrders, getTotalRevenue } from "@/lib/orders";
import { getProductCount } from "@/lib/products";
import { Revenue } from "@/lib/utils";
import { unstable_noStore as noStore } from "next/cache";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function initializeData(): Revenue[] {
  return months.map((month) => ({ month, revenue: 0 }));
}

function getMonthName(monthNumber: number): string {
  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else {
    return "NA";
  }
}

export async function getAdminRevenueData(): Promise<Revenue[]> {
  try {
    let data: Revenue[] = initializeData();
    const orders = await getOrders();
    orders.forEach((order) => {
      const orderMonth = order.createdAt
        ? new Date(order.createdAt).getMonth() + 1
        : null;
      if (orderMonth !== null) {
        const monthName = getMonthName(orderMonth);
        const orderRevenue = Number(order.grandTotal);
        const existingMonth = data.find((item) => item.month === monthName);
        if (existingMonth) {
          existingMonth.revenue += orderRevenue;
        }
      }
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getAdminCardData() {
  noStore();
  try {
    const revenue = await getTotalRevenue();
    const orderCount = await getOrderCount();
    const productCount = await getProductCount();
    const customerCount = await getOrderCount();

    let totalRevenue = "$" + (revenue ? revenue.toFixed(2) : "0");
    return {
      totalRevenue,
      productCount,
      customerCount,
      orderCount,
    };
  } catch (error) {
    throw new Error("Failed to card data.");
  }
}
