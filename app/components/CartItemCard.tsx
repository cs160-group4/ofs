"use client"
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';
import { CartItem } from '../lib/cart';
import { deleteCartProduct, updateCartItem } from '../actions/cart';

export function CartItemCard({ item, id, revalidateUrl }: {item: CartItem, id: string, revalidateUrl: string }) {
  const[quantity, setQuantity] = useState(item.cart.quantity);

  async function handleQuantityChange({id, itemQuantity}: {id: Number, itemQuantity: Number}) {
    const formData = new FormData();
    formData.set("cartId", String(item.cart.id));
    formData.set("quantity", String(itemQuantity));
    formData.set("revalidateUrl", revalidateUrl);
    
    const res = await updateCartItem(formData);
    console.log(res.message);
  }

  return (
    <div>
      <ul className="my-2 pb-2 space-y-2 mt-auto mb-auto">
        <li className="grid grid-cols-3 gap-1 py-2 bg-white rounded-box items-center justify-center">
          <div className="row-span-2 items-center m-2 ps-6">
            <Image src={`/${item.products.picture}`} width={100} height={100} alt={item.products.description} />
          </div>
          <div className="col-span-2 text-left">
            <h2 className="text-lg font-bold text-left">{item.products.name}</h2>
          </div>
          <div>
            <p className="text-sm"><b>Quantity: </b></p>
            <form>
              <input type="number" name="quantity" min="1" max={item.products.itemQuantity} 
                value={quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value, 10);
                 
                  if(!isNaN(newQuantity)){ 
                    setQuantity(newQuantity);
                  }

                  if(newQuantity > item.products.itemQuantity){
                    alert("The amount you requested is currently not available in store!");
                    setQuantity(item.products.itemQuantity);
                  }
                  
                  handleQuantityChange({id: item.cart.id, itemQuantity: newQuantity});
                }}
                className="w-1/2 px-2 py-4 text-center border-0 rounded-md bg-gray-50 dark:text-gray-400"
              ></input>
              <button className="btn text-center btn-link text-sm">Update</button>
            </form>
          </div>
          <div>
            <p className="text-sm"><b>Weight: </b>{item.products.itemWeight * item.cart.quantity} lbs </p>
            <p className="text-sm"><b>Price: </b>${(parseFloat(item.products.itemPrice) * item.cart.quantity).toFixed(2)}</p>
            <form action={async (formData: FormData) => {
              formData.set("cartId", String(item.cart.id));
              formData.set("userId", String(id));
              formData.set("revalidateUrl", String(revalidateUrl));

              const res = await deleteCartProduct(formData);

              try {

              } catch (error) {
              
              }
            }}>
              <button className="btn text-center btn-link text-sm">Delete</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  );
}