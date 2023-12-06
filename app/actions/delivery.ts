'use server'
import { OrderWithLocation, getPendingOrders } from "@/app/lib/orders";
import { Location, distance, ofs_location } from "@/app/lib/utils";
import { setDeliveryToRobot } from "@/app/lib/delivery";
import { getAvailableRobots } from "@/app/lib/robots";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export async function processOrdersAction(prevState: any, formData: FormData) {
  try {
    const pendingList = await getPendingOrders();
    let orderList: OrderWithLocation[] = [];
    // for each item and id
    for (let i = 0; i < pendingList.length; i++) {
      const order = pendingList[i].orders;
      const address = pendingList[i].addresses;
      const location = {
        longitude: Number(address.longitude),
        latitude: Number(address.latitude),
      };
      if (location.latitude != null && location.longitude != null) {
        let temp: OrderWithLocation = {
          id: order.id,
          weight: order.totalWeight,
          location: location,
        };
        orderList.push(temp);
      }
    }

    let pickedOrders: OrderWithLocation[][] = [];

    for (let i = 0; i < 10; i++) {
      let orders = pickOrders(orderList, ofs_location);
      if (orders.length > 0) {
        pickedOrders.push(orders);
      }
      for (let j = 0; j < orders.length; j++) {
        removeOrder(orderList, orders[j].id);
      }
    }
    await getAvailableRobots().then(async (robots) => {
      for (let i = 0; i < pickedOrders.length; i++) {
        if (robots[i]?.id) {
          await setDeliveryToRobot(robots[i].id, pickedOrders[i]);
        }
      }
    });
  } catch (error) {
    return { message: "Database Error: Failed to update Delivery ." };
  }
  revalidatePath("/admin/delivery");
  redirect("/admin/delivery?status=delivering");
}

function pickOrders(order_list: OrderWithLocation[], ofs_location: Location) {
  const robot_capacity = 10;
  const max_weight = 200;
  // Find the nearest order
  const nearest_order = order_list.reduce((nearest, order) => {
    const dist = distance(order.location, ofs_location);
    return dist < distance(nearest.location, ofs_location) ? order : nearest;
  }, order_list[0]);

  // Calculate distances for each order relative to the nearest location
  const ordersWithDistances = order_list.map((order) => ({
    order,
    distance: distance(order.location, nearest_order.location),
  }));

  // Sort orders by distance
  ordersWithDistances.sort((a, b) => a.distance - b.distance);

  // Pick orders based on robot capacity and max weight
  let order_count = 0;
  let total_weight = 0;
  const picked_orders: OrderWithLocation[] = [];

  for (const { order } of ordersWithDistances) {
    if (order_count >= robot_capacity || total_weight >= max_weight) {
      break;
    }

    // Check limits before adding the order
    if (total_weight + order.weight <= max_weight) {
      order_count++;
      total_weight += order.weight;
      picked_orders.push(order);
    }
  }

  return picked_orders;
}

function removeOrder(order_list: OrderWithLocation[], orderIdToRemove: number) {
  const indexToRemove = order_list.findIndex(
    (order) => order.id === orderIdToRemove
  );
  if (indexToRemove !== -1) {
    order_list.splice(indexToRemove, 1);
  }
}
