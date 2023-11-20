"use client"
import { Addresses } from '@/lib/addresses';
import { PaymentMethod } from '../lib/payment_methods';
import { CartItem } from '@/lib/cart';
import { CartItemCard } from '@/app/components/CartItemCard';
import { DeliveryAddressComponent } from '@/app/components/DeliveryAddressComponent';
import { PaymentMethodComponent } from '@/app/components/PaymentMethodComponent';
import { CheckoutButton } from '@/app/components/CheckoutButton';
import {useState} from 'react';
import { delivery } from '../db/schema';

export function CheckoutPage({name, id, addresses, paymentMethods, cartItems }: {name: string, id: string, addresses: Addresses[], paymentMethods: PaymentMethod[], cartItems: CartItem[]}) {
  const [shippingAddressId, setShippingAddressId] = useState(addresses[0]?.id ? addresses[0].id : 0);
  const updateShippingAddress = (id: number) => {
    setShippingAddressId(id);
  }

  var deliveryAddress = addresses[0] ? addresses[0] : null;
  addresses.forEach((address) => {
    if(address.id == shippingAddressId) {
      deliveryAddress = address;
    }
  });

  const [cardId, setCardId] = useState(paymentMethods[0]?.id ? paymentMethods[0].id : 0);
  const updateCardId = (id: number) => {
    setCardId(id);
  }
  var paymentMethod = paymentMethods[0] ? paymentMethods[0] : null;
  paymentMethods.forEach((card) => {
    if(card.id === cardId) {
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
    <div className="mx-auto justify-center md:flex md:space-x-6">
      <div className="grid grid-cols-3 gap-10 auto-cols-max md:w-4/5">
        <h2 className="font-bold text-xl">1. Delivery Address</h2>
        <div>
          {name}<br />
          {deliveryAddress 
            ? <> 
            {deliveryAddress.addressLine1}<br />
            {deliveryAddress.addressLine2 && deliveryAddress.addressLine2.trim() !== "" && (
              <span>{deliveryAddress.addressLine2}<br /></span>
            )}
            {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.postalCode}</>
            :(<span>
                <p>You have not set up an address yet.</p>
                <DeliveryAddressComponent id={id} addresses={addresses} setShippingAddress={updateShippingAddress} className="text-center btn-link font-small" txt="Add an address."/>
              </span>)
          }
        </div>
        <div>
          <DeliveryAddressComponent id={id} addresses={addresses} setShippingAddress={updateShippingAddress} className="btn text-center btn-link font-small" txt="CHANGE"/>
        </div>

        <h2 className="font-bold text-xl">2. Payment Method</h2>
        <div>
          {paymentMethod 
            ? ( <span>
                <p><b>Card</b> ending in <b>{paymentMethod.cardNumber.slice(-4)}</b></p>
                <p><b>Billing Address:</b> Same as shipping address.</p>
              </span>) 
            : (<span>
                <p>You have not set up a payment method yet.</p>
                <PaymentMethodComponent id={id} paymentMethods={paymentMethods} setPaymentMethod={updateCardId}
                  className="text-center btn-link font-small" txt="Add a credit card."/>
              </span>)
          }
        </div>
        <div>
          <PaymentMethodComponent id={id} paymentMethods={paymentMethods} setPaymentMethod={updateCardId}
            className="btn text-center btn-link font-small" txt="CHANGE"/>
        </div>
                    
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
       
        <CheckoutButton id={id} totalWeight={totalWeight} shipping={shippingString} tax={taxString} subtotal={subtotalString} total={totalString} cartItems={cartItems} shippingAddressId={shippingAddressId} missingInfo={deliveryAddress == null || paymentMethod == null} />
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
