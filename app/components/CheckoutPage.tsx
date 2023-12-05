"use client"
import { CartItemCard } from '@/app/components/CartItemCard';
import { CheckoutButton } from '@/app/components/CheckoutButton';
import { DeliveryAddressComponent } from '@/app/components/DeliveryAddressComponent';
import { PaymentMethodComponent } from '@/app/components/PaymentMethodComponent';
import { Addresses } from '@/lib/addresses';
import { CartItem } from '@/lib/cart';
import { useState } from 'react';
import { PaymentMethod } from '@/lib/payment_methods';

/*
  Authors: Fariha Ahmed <fariha.ahmed@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export function CheckoutPage({ name, id, addresses, paymentMethods, cartItems }: { name: string, id: string, addresses: Addresses[], paymentMethods: PaymentMethod[], cartItems: CartItem[] }) {
    const [shippingAddressId, setShippingAddressId] = useState(addresses[0]?.id ? addresses[0].id : 0);
    const updateShippingAddress = (id: number) => {
        setShippingAddressId(id);
    }

    var deliveryAddress = addresses[0] ? addresses[0] : null;
    addresses.forEach((address) => {
        if (address.id == shippingAddressId) {
            deliveryAddress = address;
        }
    });

    const [cardId, setCardId] = useState(paymentMethods[0]?.id ? paymentMethods[0].id : 0);
    const updateCardId = (id: number) => {
        setCardId(id);
    }
    var paymentMethod = paymentMethods[0] ? paymentMethods[0] : null;
    paymentMethods.forEach((card) => {
        if (card.id === cardId) {
            paymentMethod = card;
        }
    })

    // Hung Pham 11/01/2023 - calculate subtotal, shipping, tax, and total
    let subtotal: number = 0;
    let totalWeight: number = 0;
    cartItems.forEach((item) => {
        if (item.products) {
            subtotal += parseFloat(item.products.itemPrice) * item.cart.quantity;
            totalWeight += item.cart.quantity * item.products.itemWeight;
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
        <div className="flex flex-wrap mx-auto justify-center gap-4 m-4">
            <div className="card grow border shadow-lg bg-base-200 p-4">
                <h2 className="font-bold text-xl">1. Delivery Address</h2>
                <div className="flex flex-wrap">
                    <div>
                        {name}<br />
                        {deliveryAddress
                            ? <>
                                {deliveryAddress.addressLine1}<br />
                                {deliveryAddress.addressLine2 && deliveryAddress.addressLine2.trim() !== "" && (
                                    <span>{deliveryAddress.addressLine2}<br /></span>
                                )}
                                {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}</>
                            : (<span>
                                <p>You have not set up an address yet.</p>
                                <DeliveryAddressComponent id={id} addresses={addresses} setShippingAddress={updateShippingAddress} className="text-center btn-link font-small" txt="Add an address." />
                            </span>)
                        }
                    </div>
                    <div>
                        <DeliveryAddressComponent id={id} addresses={addresses} setShippingAddress={updateShippingAddress} className="btn text-center btn-link font-small" txt="CHANGE" />
                    </div>
                </div>
                <h2 className="font-bold text-xl mt-2">2. Payment Method</h2>
                <div className="flex flex-wrap">
                    <div>
                        {paymentMethod
                            ? (<span>
                                <p><b>Card</b> ending in <b>{paymentMethod.cardNumber.slice(-4)}</b></p>
                                <p><b>Billing Address:</b> Same as shipping address.</p>
                            </span>)
                            : (<span>
                                <p>You have not set up a payment method yet.</p>
                                <PaymentMethodComponent id={id} paymentMethods={paymentMethods} setPaymentMethod={updateCardId}
                                    className="text-center btn-link font-small" txt="Add a credit card." />
                            </span>)
                        }
                    </div>
                    <div>
                        <PaymentMethodComponent id={id} paymentMethods={paymentMethods} setPaymentMethod={updateCardId}
                            className="btn text-center btn-link font-small" txt="CHANGE" />
                    </div>
                </div>
                <h2 className="font-bold text-xl mt-2">3. Review Items</h2>
                <div className="col-span-2 rounded-lg overflow-y-auto max-h-[550px]">
                    <ul className="-my-2 pb-1 mt-auto mb-auto">
                        {cartItems.map((item) => (
                            <CartItemCard key={item.cart.id} id={id} item={item} revalidateUrl="/checkout" />
                        ))}
                    </ul>
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

                    <CheckoutButton id={id} totalWeight={totalWeight} shipping={shippingString} tax={taxString} subtotal={subtotalString} total={totalString} cartItems={cartItems} shippingAddressId={shippingAddressId} missingInfo={deliveryAddress == null || paymentMethod == null} />
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
    if (weight < 20) {
        return 0;
    }
    return 10;
}
