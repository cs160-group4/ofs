import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import { CartItemCard } from '@/components/CartItemCard';
import { CartItem, getCart } from '@/lib/cart';
import Link from 'next/link'
import React from 'react'

export default async function Cart() {
    var signedIn = false;
    var id = "";

    const session = await getAuthSession();
    if (session?.user) {
        signedIn = true;
        id = session.user.id as string;
    }

    const cartItems = await getCart(id);

    // Hung Pham 11/01/2023 - calculate subtotal, shipping, tax, and total
    let subtotal: number = 0;
    cartItems.forEach((item) => {
        if (item.products) {
            subtotal += parseFloat(item.products.itemPrice) * item.cart.quantity;
        }
    });
    const shipping = calculateShipping(cartItems);
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const subtotalString = subtotal.toFixed(2);
    const shippingString = shipping.toFixed(2);
    const taxString = tax.toFixed(2);
    const totalString = total.toFixed(2);
    // Hung Pham 11/01/2023 - end of calculations

    return (
        <div className="container mx-auto px-6 pt-7 bg-base-100 xl:px-0 relative">
            <div className="flex pb-6 justify-center md:justify-start">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
            </div>

            <div className="mx-auto justify-center md:flex md:space-x-6">
                <div className="rounded-lg md:w-3/5">
                    {/* replace bg color */}
                    <div className="justify-between mb-3 rounded-lg w-full p-6 bg-base-200 border sm:flex sm:justify-start">
                        {/* shopping items */}
                        <div className="flex flex-col w-full mt-6 overflow-y-auto">
                            <div className="flow-root">
                                <ul className="-my-2 pb-1 space-y-1 mt-auto mb-auto">
                                    {/* replace bg color */}
                                    {cartItems.map((item) => (
                                        <CartItemCard key={item.cart.id} item={item} revalidateUrl="/cart" />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* price totals -- replace bg color*/}
                <div className="container mt-6 h-full rounded-lg border bg-base-200 shadow-md md:mt-0 md:w-2/5 px-3 py-3">
                    <div className="mb-2 flex justify-between">
                        <p>Subtotal</p>
                        <p>${subtotalString}</p>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <p>Shipping</p>
                        <p>${shippingString}</p>
                    </div>
                    <div className="mb-2 flex justify-between">
                        <p>Tax</p>
                        <p>${taxString}</p>
                    </div>
                    <div className="divider border-black"></div>
                    <div className="flex justify-between font=bold text-xl">
                        <p>Total</p>
                        <p>${totalString}</p>
                    </div>
                    {/* button links to checkout */}
                    {/* <button className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium"> */}
                    <Link href="/checkout" className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium">Checkout</Link>
                    {/* </button> */}
                </div>
            </div>
        </div>
    )
}

// calculates shipping cost based on weight of items in cart - Hung Pham 11/01/2023
function calculateShipping(cartItems: CartItem[]): number {
    let weight = 0;
    cartItems.forEach((item) => {
        weight += item.cart.quantity * item.products.itemWeight;
    });
    if (weight > 20) {
        return 0;
    }
    return 10;
}
