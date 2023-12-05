import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import { CheckoutPage } from '@/app/components/CheckoutPage';
import { getPaymentMethod } from '@/app/lib/payment_methods';
import { getAddress } from '@/lib/addresses';
import { getCart } from '@/lib/cart';
import Link from 'next/link';

/*
  Authors: Fariha Ahmed <fariha.ahmed@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export default async function Checkout() {
    var signedIn = false;
    var name = "";
    var id = "";

    const session = await getAuthSession();
    if (session?.user) {
        signedIn = true;
        name = session.user.name as string;
        id = session.user.id as string;
    }
    else {
        return <main className="flex items-center justify-center h-screen">
            <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                <div className="flex flex-col items-center">
                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-black">Please Login Before You<br></br>Can See Your Checkout</span>
                    </h6>
                    <Link href="/auth/signin" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                        Sign In
                    </Link>
                </div>
            </div>
        </main>
    }

    const addresses = await getAddress(id);
    const paymentMethods = await getPaymentMethod(id);
    const cartItems = await getCart(id);

    // Hung Pham 11/01/2023 - calculate subtotal, shipping, tax, and total
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

    return (
        <div className="flex flex-col items-center justify-center ">
            <div className="flex pb-6 justify-center md:justify-start">
                <h1 className="text-3xl font-bold">Checkout</h1>
            </div>
            <CheckoutPage name={name} id={id} addresses={addresses} paymentMethods={paymentMethods} cartItems={cartItems} />
        </div>
    )
}