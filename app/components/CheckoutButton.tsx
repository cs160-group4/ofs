"use client"
import React from 'react';
import { CartItem } from '../lib/cart';
import { createNewOrder, getLatestOrderByUserId } from "../actions";
import { createOrderItem } from '../actions'; 

export function CheckoutButton({id, totalWeight, shipping, tax, subtotal, total, cartItems}: {id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[]}) {
  var orderId = 0;
  
  async function createNewOrderItem({itemWeight, productId, quantity, orderId, price}: {itemWeight: number, productId: number, quantity: number, orderId: number, price: string}){
    const formData = new FormData();
    
    formData.set("itemWeight", String(itemWeight));
    formData.set("productId", String(productId));
    formData.set("quantity", String(quantity));
    formData.set("orderId", String(orderId));
    formData.set("price", price);

    const res = await createOrderItem(formData);
    console.log(res.message);
  }

  async function createOrder({id, totalWeight, shipping, tax, subtotal, total, cartItems}: {id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[]}){
    const formData = new FormData();

    formData.set("userId", id);
    formData.set("totalWeight", String(totalWeight));
    formData.set("shippingCost", shipping);
    formData.set("tax", tax);
    formData.set("discount", "0.00");
    formData.set("subtotal", subtotal);
    formData.set("grandTotal", total);
    formData.set("deliveryStatus", "Pending");

    try {
      await createNewOrder(formData);

      const res2 = await getLatestOrderByUserId(formData);
      orderId = Number(res2.data);

      cartItems.forEach((item) => {        
        createNewOrderItem({itemWeight: item.products.itemWeight, productId: item.products.id, quantity: item.cart.quantity, orderId: orderId, price: item.products.itemPrice});
      });

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