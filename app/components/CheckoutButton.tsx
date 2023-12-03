"use client"
import React from 'react';
import { Addresses } from '../lib/addresses';
import { CartItem } from '@/lib/cart';
import { PaymentMethod } from '../lib/payment_methods';
import { createNewOrder, getLatestOrderByUserId, createOrderItem } from "../actions";
import { deleteAllCartItems } from '@/actions/cart';
import { updateProductItemQuantity } from '@/actions/products';
import { revalidatePath } from 'next/cache';

/*
  Author: Fariha Ahmed
  Email: fariha.ahmed@sjsu.edu
  Copyright (c) 2023 Fariha Ahmed. All rights reserved.
*/

export function CheckoutButton({id, totalWeight, shipping, tax, subtotal, total, cartItems, shippingAddressId, missingInfo }: {id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[], shippingAddressId: number, missingInfo: boolean }) {
  var orderId = 0;
  
  // Function to create an order item for each item in the user's cart
  async function createNewOrderItem({item, itemWeight, productId, quantity, orderId, price}: {item: CartItem, itemWeight: number, productId: number, quantity: number, orderId: number, price: string}){
    const formData = new FormData();
    
    formData.set("itemWeight", String(itemWeight));
    formData.set("productId", String(productId));
    formData.set("quantity", String(quantity));
    formData.set("orderId", String(orderId));
    formData.set("price", price);

    const orderItem = await createOrderItem(formData);
  }

  // Function to update the amount of product left in stock after a customer places an order
  async function updateProductQuantity(item: CartItem){
    const updatedProductQuantity = item.products.itemQuantity - item.cart.quantity;
    const updateDB = await updateProductItemQuantity(item.products.id, updatedProductQuantity);
  }

  // Function to create an order based on what the user has in the cart 
  async function createOrder({id, totalWeight, shipping, tax, subtotal, total, cartItems}: {id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[]}){
    if(missingInfo) {
      alert("You have not inputted a delivery address and/or a payment method.");
    } else {
      const formData = new FormData();

      formData.set("userId", id);
      formData.set("totalWeight", String(totalWeight));
      formData.set("shippingCost", shipping);
      formData.set("tax", tax);
      formData.set("discount", "0.00");
      formData.set("subtotal", subtotal);
      formData.set("grandTotal", total);
      formData.set("shippingAddressId", String(shippingAddressId));

      try {
        await createNewOrder(formData);

        const latestOrderId = await getLatestOrderByUserId(formData);
        orderId = Number(latestOrderId.data);
        formData.set("orderId", String(orderId));

        await Promise.all(cartItems.map((item) => {
          return createNewOrderItem({item: item, itemWeight: item.products.itemWeight, productId: item.products.id, quantity: item.cart.quantity, orderId: orderId, price: item.products.itemPrice});
        }));

        await Promise.all(cartItems.map((item) => {
          return updateProductQuantity(item);
        }));

        await deleteAllCartItems(id);

        //setTimeout(() => {
        window.location.href = `/order-summary/${orderId}`;
        //}, 1000);

        // const res = await assignOrderToRobot(formData);
      } catch (error) {
      }
    }
  }
  
  return (
    <div>
      <button
            onClick={(event) => {
              createOrder({id: id, totalWeight: totalWeight, shipping: shipping, tax: tax, subtotal: subtotal, total: total, cartItems: cartItems})
            }} 
            className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium text-white">
        Place Your Order & Pay
      </button>   
    </div>
  );
}