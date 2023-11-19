"use client"
import React from 'react';
import { CartItem } from '@/lib/cart';
import { createNewOrder, getLatestOrderByUserId, createOrderItem } from "../actions";
import { deleteAllCartItems } from '@/actions/cart';
import { updateProductItemQuantity } from '@/actions/products';

/*
  Author: Fariha Ahmed
  Email: fariha.ahmed@sjsu.edu
  Copyright (c) 2023 Fariha Ahmed. All rights reserved.
*/

export function CheckoutButton({id, totalWeight, shipping, tax, subtotal, total, cartItems, shippingAddressId}: {id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[], shippingAddressId: number}) {
  var orderId = 0;
  
  // Function to create an order item for each item in the user's cart
  async function createNewOrderItem({item, itemWeight, productId, quantity, orderId, price}: {item: CartItem, itemWeight: number, productId: number, quantity: number, orderId: number, price: string}){
    const formData = new FormData();
    
    formData.set("itemWeight", String(itemWeight));
    formData.set("productId", String(productId));
    formData.set("quantity", String(quantity));
    formData.set("orderId", String(orderId));
    formData.set("price", price);

    await createOrderItem(formData);

    const updatedProductQuantity = item.products.itemQuantity - quantity;
    await updateProductItemQuantity(productId, updatedProductQuantity);
  }

  // Function to create an order based on what the user has in the cart 
  async function createOrder({id, totalWeight, shipping, tax, subtotal, total, cartItems}: {id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[]}){
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

      cartItems.forEach((item) => {        
        createNewOrderItem({item: item, itemWeight: item.products.itemWeight, productId: item.products.id, quantity: item.cart.quantity, orderId: orderId, price: item.products.itemPrice});
      });

      await deleteAllCartItems(id);

      // const res = await assignOrderToRobot(formData);

      setTimeout(() => {
        window.location.href = `/order-summary/${orderId}`;
      }, 1000);
    } catch (error) {
      console.log(error);
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