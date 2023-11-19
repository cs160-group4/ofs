"use client"
import { Addresses } from '@/lib/addresses';
import { CartItem } from '@/lib/cart';
import { CartItemCard } from '@/app/components/CartItemCard';
import { DeliveryAddressComponent } from '@/app/components/DeliveryAddressComponent';
import { PaymentMethod } from '@/app/components/PaymentMethod';
import { CheckoutButton } from '@/app/components/CheckoutButton';
import {useState} from 'react';
import { delivery } from '../db/schema';

export function CheckoutPage({name, id, addresses, cartItems }: {name: string, id: string, addresses: Addresses[], cartItems: CartItem[]}) {
  const [shippingAddressId, setShippingAddressId] = useState(0);
  const updateShippingAddress = (id: number) => {
    setShippingAddressId(id);
  }

  var deliveryAddress = addresses[0];
  addresses.forEach((address) => {
    if(address.id == shippingAddressId) {
      deliveryAddress = address;
    }
  });

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
    <div className="mx-auto justify-center md:flex md:space-x-6">
      <div className="grid grid-cols-3 gap-10 auto-cols-max md:w-4/5">
        <h2 className="font-bold text-xl">1. Delivery Address</h2>
        <div>
          {name}<br />
          {deliveryAddress ? <> {deliveryAddress.addressLine1}<br />
            {deliveryAddress.addressLine2 && deliveryAddress.addressLine2.trim() !== "" && (
              <span>{deliveryAddress.addressLine2}<br /></span>
            )}
            {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}</>
          :<p>You have not set up an address yet. Please add one.</p>}          
        </div>
        <div>
          <DeliveryAddressComponent id={id} addresses={addresses} setShippingAddress={updateShippingAddress}/>
        </div>

        <h2 className="font-bold text-xl">2. Payment Method</h2>
        <PaymentMethod id={id} />
                    
        <h2 className="font-bold text-xl">3. Review Items</h2>
        <div className="col-span-2 rounded-lg overflow-y-auto max-h-[550px]">
          <ul className="-my-2 pb-1 mt-auto mb-auto">
            {cartItems.map((item) => (
              <CartItemCard key={item.cart.id} id={id} item={item} revalidateUrl="/checkout" />
            ))}
          </ul>
        </div>
      </div>

      <div className="container mt-6 h-full rounded-lg border bg-base-200 shadow-md md:mt-0 md:w-1/5 px-3 py-3">
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
            <p className="text-red-600">Total</p>
            <p>${totalString}</p>
        </div>
        <CheckoutButton id={id} totalWeight={totalWeight} shipping={shippingString} tax={taxString} subtotal={subtotalString} total={totalString} cartItems={cartItems} shippingAddressId={shippingAddressId}/>
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
