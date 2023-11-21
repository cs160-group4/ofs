import { setDeliveryToRobot } from "@/app/lib/delivery";
import { OrderWithLocation, getPendingOrders } from "@/app/lib/orders";
import { getAvailableRobots } from "@/app/lib/robots";
import { Location, distance, ofs_location } from "@/app/lib/utils";
import { SubmitButton } from "../../common/Buttons";

export default function ActivateOrderProcessing() {

  return (
    <>
      <form action={async () => {
        'use server'
        const pending_list = await getPendingOrders();
        let order_list: OrderWithLocation[] = [];
        // for each item and id
        for (let i = 0; i < pending_list.length; i++) {
          const order = pending_list[i].orders;
          const address = pending_list[i].addresses;
          const location = { longitude: Number(address.longitude), latitude: Number(address.latitude) };
          if (location.latitude != null && location.longitude != null) {
            let temp: OrderWithLocation = { id: order.id, weight: order.totalWeight, location: location };
            order_list.push(temp);
          }
        }

        let picked_orders: OrderWithLocation[][] = [];
        for (let i = 0; i < 10; i++) {
          let orders = pickOrders(order_list, ofs_location);
          if (orders.length > 0) {
            picked_orders.push(orders);
          }
          for (let j = 0; j < orders.length; j++) {
            removeOrder(order_list, orders[j].id);
          }
        }
        await getAvailableRobots().then(async (robots) => {
          for (let i = 0; i < picked_orders.length; i++) {
            if (robots[i]?.id) {
              await setDeliveryToRobot(robots[i].id, picked_orders[i]);
            }
          }
        });
      }}>
        <SubmitButton text="Activate Order Processing" />
      </form >
    </>
  )
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
  const ordersWithDistances = order_list.map(order => ({
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
  const indexToRemove = order_list.findIndex(order => order.id === orderIdToRemove);
  if (indexToRemove !== -1) {
    order_list.splice(indexToRemove, 1);
  }
}