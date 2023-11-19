import { Order } from '@/lib/orders';
import { getUser } from '@/lib/users';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function OrdersStatusComponent({ order }: { order: Order }) {
    if (!order) return null;
    let user = await getUser(order.userId);
    let userName = user?.name ? user?.name : user?.firstName + " " + user?.lastName;
    let bagClass = "";
    switch (order.deliveryStatus) {
        case "pending":
            bagClass = "badge badge-warning gap-2 text-white";
            break;
        case "processing":
            bagClass = "badge badge-warning gap-2 text-white";
            break;
        case "shipped":
            bagClass = "badge badge-info gap-2 text-white";
            break;
        case "delivered":
            bagClass = "badge badge-success gap-2 text-white";
            break;
        case "cancelled":
            bagClass = "badge badge-error gap-2 text-white";
            break;
        default:
            bagClass = "badge badge-info gap-2 text-white";
            break;
    }
    return (
        <>
            <div className="flex justify-between p-4 mb-4 bg-gray-100 rounded dark:bg-gray-800">
                <div className="flex ">
                    <span
                        className="inline-flex items-center justify-center mr-4 w-24 ">
                        <div className={bagClass}>
                            {order.deliveryStatus}
                        </div>
                    </span>
                    <div className="text-xs">
                        <p className="font-medium dark:text-gray-400">#{order.id} - {order.createdAt}</p>
                        <p className="text-gray-500 dark:text-gray-400">{userName}</p>
                    </div>
                </div>
                <div className="flex">
                    <button className="mr-2 text-blue-600 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                    </button>
                    <button className="text-red-600 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path
                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                    </button>
                </div>

            </div>
        </>
    );
};
