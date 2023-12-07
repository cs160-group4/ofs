import { checkRobotStatus } from "@/app/lib/delivery";
import { updateOrderDeliveryStatus } from "@/app/lib/orders";

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
  let robotId = body.robotId;
  await updateOrderDeliveryStatus(id, "delivered");
  await checkRobotStatus(robotId);
  return Response.json("success");
}
