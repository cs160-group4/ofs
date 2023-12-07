"use client"
import React from 'react';
import { useState } from 'react';
import { Addresses } from '../lib/addresses';
import { CartItem } from '@/lib/cart';
import { PaymentMethod } from '../lib/payment_methods';
import { createNewOrder, getLatestOrderByUserId, createOrderItem } from "../actions";
import { deleteAllCartItems } from '@/actions/cart';
import { updateProductItemQuantity, restoreItemQuantity } from '@/actions/products';
import { revalidatePath } from 'next/cache';
import { SubmitButton } from '../ui/common/Buttons';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/common/Button';
import { Spinner } from '../ui/common/Spinner';

/*
  Authors: Fariha Ahmed <fariha.ahmed@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export function CheckoutButton({ id, totalWeight, shipping, tax, subtotal, total, cartItems, shippingAddressId, missingInfo }: { id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[], shippingAddressId: number, missingInfo: boolean }) {
  var orderId = 0;
  var unavailableItems = "";
  var insufficientOrder = false;
  var insufficientItems: CartItem[] = [];
  var sufficientItems: CartItem[] = [];

  // Function to create an order item for each item in the user's cart
  async function createNewOrderItem({ item, itemWeight, productId, quantity, orderId, price }: { item: CartItem, itemWeight: number, productId: number, quantity: number, orderId: number, price: string }) {
    const formData = new FormData();

    formData.set("itemWeight", String(itemWeight));
    formData.set("productId", String(productId));
    formData.set("quantity", String(quantity));
    formData.set("orderId", String(orderId));
    formData.set("price", price);

    const orderItem = await createOrderItem(formData);
  }

  // Function to check if any items in a user's cart have become unavailable
  async function checkForUnavailableItems (cartItems: CartItem[]) {
    const outOfStockItems = cartItems.filter((item) => {
      return item.products.itemQuantity < item.cart.quantity;
    });

    if (outOfStockItems.length > 0) {
      unavailableItems = outOfStockItems.map((item) => item.products.name).join('\n');
      return true;
    }
    return false;
  }

  // Function to update the amount of product left in stock after a customer places an order
  async function updateProductQuantity(item: CartItem) {
    const updateDB = await updateProductItemQuantity(item.products.id, item.cart.quantity, item.products.updatedAt? item.products.updatedAt: "");
    if(updateDB.success === false) {
      console.log(updateDB.message);
      insufficientOrder = true;
      insufficientItems.push(item);
    } else {
      sufficientItems.push(item);
    }
    //alert(`${item.products.name}: ${updateDB.message}`)
  }

  // Function to restock an item if order can't be completed
  async function restockItem(item: CartItem) {
    await restoreItemQuantity(item.products.id, item.cart.quantity);
  }

  // Function to create an order based on what the user has in the cart 
  async function createOrder({ id, totalWeight, shipping, tax, subtotal, total, cartItems }: { id: string, totalWeight: number, shipping: string, tax: string, subtotal: string, total: string, cartItems: CartItem[] }) {
    if (missingInfo) {
      alert("You have not inputted a delivery address and/or a payment method.");
    } else if (totalWeight > 200) {
      alert(`Your order has a total weight of ${totalWeight}, which exceeds the maximum accepted weight of 200 lbs`);
    } else if (await checkForUnavailableItems(cartItems)) {
      alert(`The following items in your cart are not available in the quantity you requested:\n\n${unavailableItems}\n\nPlease edit/delete the specified cart items and refresh to proceed with your order!`);
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
        for (const item of cartItems){
          await updateProductQuantity(item);
        }

        if (!insufficientOrder) {
          await createNewOrder(formData);

          const latestOrderId = await getLatestOrderByUserId(formData);
          orderId = Number(latestOrderId.data);
          formData.set("orderId", String(orderId));

          await Promise.all(cartItems.map((item) => {
            createNewOrderItem({ item: item, itemWeight: item.products.itemWeight, productId: item.products.id, quantity: item.cart.quantity, orderId: orderId, price: item.products.itemPrice });
          }));

          await deleteAllCartItems(id);
          //setTimeout(() => {
          window.location.href = `/order-summary/${orderId}`;
          //}, 1000);
        } else {
          var insufficientItemsString = insufficientItems.map((item) => item.products.name).join('\n');

          alert(`The following items in your cart are not available in the quantity you requested:\n\n${insufficientItemsString}\n\nPlease edit/delete the specified cart items and refresh to proceed with your order!`)
          
          //restock the sufficient items 
          sufficientItems.forEach((item) => {
            restockItem(item);
          })
        } 
      } catch (error) {
      }
    }
  }

  return (
    <div>
      {/* <button
            onClick={(event) => {
              createOrder({id: id, totalWeight: totalWeight, shipping: shipping, tax: tax, subtotal: subtotal, total: total, cartItems: cartItems})
            }} 
            className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium text-white">
        Place Your Order & Pay
      </button>    */}
      <form action={() => {
        createOrder({ id: id, totalWeight: totalWeight, shipping: shipping, tax: tax, subtotal: subtotal, total: total, cartItems: cartItems });
      }
      }>
        <CheckOutSubmitButton text="Place Your Order & Pay" />
      </form>
    </div>
  );
}

export const CheckOutSubmitButton = ({ text = "Submit" }: { text?: string }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="flex w-full items-center justify-center h-11 rounded-lg bg-primary text-sm font-medium hover:bg-teal-500 active:bg-teal-600"
      disabled={pending}  >
      {pending ? <Spinner /> : null}
      {text}
    </Button>
  );
};