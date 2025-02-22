"use client"
import { deleteCartProduct, updateCartItem } from '@/actions/cart';
import { CartItem } from '@/lib/cart';
import { getImageUrl } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitButtonText } from '@/ui/common/Buttons';

/*
  Authors: Aaron Low <aaron.c.low@sjsu.edu>, Fariha Ahmed <fariha.ahmed@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export function CartItemCard({ item, id, revalidateUrl }: { item: CartItem, id: string, revalidateUrl: string }) {
  const [quantity, setQuantity] = useState(item.cart.quantity);

  async function handleQuantityChange(itemQuantity: string) {
    let newQuantity = parseInt(itemQuantity, 10);
    if (isNaN(newQuantity) || newQuantity <= 0) {
      newQuantity = 1;
    } else if (newQuantity > item.products.itemQuantity) {
      alert("The amount you requested is currently not available in store!");
      newQuantity = item.products.itemQuantity;
    }
    setQuantity(newQuantity);
    const formData = new FormData();
    formData.set("cartId", String(item.cart.id));
    formData.set("quantity", String(itemQuantity));
    formData.set("revalidateUrl", revalidateUrl);
    await updateCartItem(formData);
  }

  return (
    <div>
      <ul className="my-2 pb-2 space-y-2 mt-auto mb-auto">
        <li className="grid grid-cols-3 border gap-1 py-2 rounded-box items-center justify-center">
          <div className="row-span-2 items-center m-2 ps-6">
            <Image src={getImageUrl(item.products.picture)} width={100} height={100} alt={item.products.description} />
          </div>
          <div className="col-span-2 text-left">
            <h2 className="text-lg font-bold text-left">{item.products.name}</h2>
          </div>
          <div>
            <p className="text-sm"><b>Quantity: </b></p>
            <form>
              <input type="number" id="quantity" name="quantity" min="1" value={quantity}
                onChange={(e) => { handleQuantityChange(e.target.value); }}
                className="w-1/2 px-2 py-4 text-center border-0 rounded-md "
              ></input>
            </form>
          </div>
          <div>
            <p className="text-sm"><b>Weight: </b>{item.products.itemWeight * item.cart.quantity} lbs </p>
            <p className="text-sm"><b>Price: </b>${(parseFloat(item.products.itemPrice) * item.cart.quantity).toFixed(2)}</p>
            <form action={async (formData: FormData) => {
              formData.set("cartId", String(item.cart.id));
              formData.set("userId", String(id));
              formData.set("revalidateUrl", String(revalidateUrl));
              await deleteCartProduct(formData);
            }}>
              {/* Add loading */}
              <SubmitButtonText text="Delete" />
            </form>
          </div>
        </li>
      </ul>
    </div>
  );
}