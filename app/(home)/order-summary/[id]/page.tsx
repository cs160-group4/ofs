import Image from 'next/image'
import Link from 'next/link'
import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getOrdersByUserIdAndOrderId } from '@/app/lib/orders';
import { OrderItemWithProduct, getOrderItemsByOrderId } from '@/app/lib/order_item';
import OrderItem from '@/app/ui/orders/OrderItem';
export default async function OrderSummary({ params }: { params: { id: string } }) {
    const session = await getAuthSession();
    const name = session?.user?.name;

    if (!name) {
        return <main className="flex items-center justify-center h-screen">
            <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                <div className="flex flex-col items-center">
                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-black">Please Login Before You<br></br>Can See Your Cart</span>
                    </h6>
                    <Link href="/auth/signin" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                        Sign In
                    </Link>
                </div>
            </div>
        </main>
    }

    let order_id: number = parseInt(params.id);
    if (isNaN(order_id)) {
        notFound();
    }

    let order = await getOrdersByUserIdAndOrderId(session?.user?.id, order_id);
    if (!order) {
        redirect('/shop');
    }

    let orderItems: OrderItemWithProduct[] = await getOrderItemsByOrderId(order_id);
    return (
        <section className="flex items-center py-16 font-poppins ">
            <div
                className="justify-center flex-1 max-w-4xl px-6 py-6 mx-auto bg-gray-100 rounded-md shadow-md ">
                <div className="mb-16 text-center">
                    <h1
                        className="mb-6 text-2xl font-semibold leading-7 tracking-wide text-gray-700 lg:text-4xl dark:text-gray-300 lg:leading-9">
                        Thank you for your order{name ? `, ${name}!` : ''}</h1>
                    {/* <p className="text-lg text-gray-500 dark:text-gray-400">your order number is: </p> */}
                </div>
                <div className="max-w-4xl mx-auto mb-10">
                    <h2 className="mb-4 text-xl font-medium dark:text-gray-400">What you ordered:</h2>
                    {orderItems.map((item) => (
                        <OrderItem key={item.order_item.id} orderItem={item} />
                    ))}
                </div>
                <div className="max-w-4xl mx-auto ">
                    <h2 className="mb-4 text-xl font-medium dark:text-gray-400 ">Order Details:</h2>
                    <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Subtotal</span>
                            <span className="flex items-center">
                                <span className="ml-3 mr-1 text-md">$</span>
                                <span className="text-xl">{order.subtotal}</span>
                            </span>
                        </div>
               
                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Shipping</span>
                            <span className="flex items-center">
                                {Number(order.shippingCost) === 0 ? <span className="text-xl">Free</span> : <><span className="ml-3 mr-1 text-md">$</span><span className="text-xl">{order.shippingCost}</span></>}
                            </span>
                        </div>

                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Tax</span>
                            <span className="flex items-center">
                                <span className="ml-3 mr-1 text-md">$</span>
                                <span className="text-xl">{order.tax}</span>
                            </span>
                        </div>
                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Total Weight</span>
                            <span className="flex items-center">
                                <span className="text-xl">{order.totalWeight}</span>
                                <span className="ml-3 mr-1 text-md">lbs</span>
                            </span>
                        </div>
                        {Number(order.discount) > 0 ? <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Discount</span>
                            <span className="flex items-center">
                                <span className="ml-3 mr-1 text-md">- $</span>
                                <span className="text-xl">{order.discount}</span>
                            </span>
                        </div> : <div></div>}

                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Total</span>
                            <span className="flex items-center text-blue-500 dark:text-blue-400">
                                <span className="ml-3 mr-1 text-md">$</span>
                                <span className="text-xl">{order.grandTotal}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 ">
                        <Link href="/shop">
                            <button
                                className="btn btn-secondary w-full px-6 py-3 rounded-md md:w-auto text-gray-100 hover:text-gray-100 hover:bg-sky-300 dark:border-gray-800 dark:hover:bg-gray-800 dark:text-gray-300">
                                Go back shopping
                            </button>
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    )
}