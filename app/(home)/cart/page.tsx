import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import { CartItemCard } from '@/components/CartItemCard';
import { CartItem, getCart } from '@/lib/cart';
import Link from 'next/link';

/*
  Authors: Fariha Ahmed <fariha.ahmed@sjsu.edu>, Kyle Chen <kyle.chen@sjsu.edu>,  Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export default async function Cart() {
    var signedIn = false;
    var id = "";

    const session = await getAuthSession();
    if (session?.user) {
        signedIn = true;
        id = session.user.id as string;
    }
    else {
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

    const cartItems = await getCart(id);

    // Hung Pham 11/01/2023 - check cart empty, calculate subtotal, shipping, tax, and total
    if (cartItems.length == 0) {
        return <main className="flex items-center justify-center m-24">
            <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                <div className="flex flex-col items-center">
                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-black">Your Cart Is Empty</span>
                    </h6>
                    <Link href="/" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </main>
    }
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
        <div className="flex flex-col items-center justify-center ">
            <div className="flex pb-6 justify-center md:justify-start">
                <h1 className="text-3xl font-bold">Shopping Cart</h1>
            </div>
            <div className="flex flex-wrap mx-auto justify-center gap-4 m-4">
                <div className="card grow border shadow-lg bg-base-200 p-2 ">
                    <div className="flex flex-col w-full ">
                        <div className="">
                            <ul className="">
                                {cartItems.map((item) => (
                                    <CartItemCard key={item.cart.id} item={item} id={id} revalidateUrl="/cart" />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card w-80 border shadow-lg bg-base-200">
                    <div className="flex card-body 64">
                        <div className="flex flex-wrap">
                            <div className='grow'>Subtotal</div>
                            <div className=''>${subtotalString}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className='grow'>Shipping</div>
                            <div>${shippingString}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className='grow'>Tax</div>
                            <div>${taxString}</div>
                        </div>
                        <div className="divider divider-neutral "></div>
                        <div className="flex font-bold text-xl">
                            <div className="grow text-red-600">Total</div>
                            <div>${totalString}</div>
                        </div>
                        <form>
                            <Link href="/checkout" className="btn btn-primary w-full rounded-md mt-3 py-1.5 font-medium text-white">Checkout</Link>
                        </form>
                    </div>
                </div>
            </div>

            {/* <div className="mx-auto justify-center md:flex md:space-x-6">
                <div className="rounded-lg md:w-4/5">

                </div>
                <div className="container mt-6 h-full rounded-lg border bg-base-200 shadow-md md:mt-0 md:w-1/5 px-3 py-3">

                </div>
            </div> */}
        </div>
    )
}

// calculates shipping cost based on weight of items in cart - Hung Pham 11/01/2023
function calculateShipping(cartItems: CartItem[]): number {
    let weight = 0;
    cartItems.forEach((item) => {
        weight += item.cart.quantity * item.products.itemWeight;
    });
    if (weight < 20) {
        return 0;
    }
    return 10;
}
