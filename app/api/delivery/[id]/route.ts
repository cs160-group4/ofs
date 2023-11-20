
import { updateOrder, updateOrderDeliveryStatus } from "@/app/lib/orders";
import { getProducts } from "@/lib/products";
 
/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

// export async function GET(req: Request) {
//     return Response.json(await getProducts());
// }

export async function POST(req: Request) {
    const body = await req.json();
  
    let id = body.orderId;
    updateOrderDeliveryStatus(id, "delivered");
    return Response.json("success");
}


