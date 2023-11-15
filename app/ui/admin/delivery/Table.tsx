import { Delivery, getFilteredDelivery } from "@/app/lib/delivery";
import { Order } from "@/app/lib/orders";
import { Robot } from "@/app/lib/robots";
import { formatDateToLocal } from "@/app/lib/utils";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function DeliveryTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    let list = await getFilteredDelivery(query, currentPage);
    let delivery: Delivery[] = [];
    let robots: Robot[] = [];
    let orders: Order[] = [];
    list.map((item) => {
        delivery.push(item.delivery);
        robots.push(item.robots);
        // orders.push(item.order);
    });

    return (
        <>
            <div className="mt-6 flow-root">
                <div className="inline-block min-w-full align-middle">
                    <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                        <div className="md:hidden">
                            {/* {delivery?.map((item, index) => (
                                <div key={item.id} className="mb-2 w-full rounded-md bg-white p-4">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <div className="mb-2 flex items-center">
                                                <p>{item.id}</p>&nbsp;-&nbsp;
                                                <p className="text-gray-500">{item.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-500">{item.status}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-500">{item.currentWeightInLbs} lbs</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full items-center justify-between pt-4">
                                        <div>
                                            <p className="text-xl font-medium">
                                            </p>
                                            <p>{formatDateToLocal(item.updatedAt as string)}</p>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                        <table className="hidden min-w-full text-gray-900 md:table">
                            <thead className="rounded-lg text-left text-sm font-normal">
                                <tr>
                                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                        ID
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Carrying
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Max Orders
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Max Weight
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-3 py-5 font-medium">
                                        Updated At
                                    </th>
                                    <th scope="col" className="relative py-3 pl-6 pr-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {delivery?.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                    >
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex items-center gap-3">
                                                <p>{item.id}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {item.deliveryStatus}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {item.deliveryAt}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {robots[index]?.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {robots[index]?.maxOrders}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {formatDateToLocal(item.createdAt as string)}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-3">
                                            {formatDateToLocal(item.updatedAt as string)}
                                        </td>
                                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                            <div className="flex justify-end gap-3">
                                                {/* <EditRobot id={item.id} /> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
