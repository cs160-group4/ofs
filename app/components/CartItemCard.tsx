import { deleteProductFromCart } from '@/lib/cart';
import { getProductById } from '@/lib/products';
import { revalidatePath } from 'next/cache'
import Image from 'next/image';
import React from 'react';

export async function CartItemCard({id, productId, quantity}: {id: number, productId: number, quantity: number}){
  const cartProduct = await getProductById(productId);
  const imageSrc = `/${cartProduct.picture}`;

  const deleteCartItem = async () => {
    'use server'
    try {
      await deleteProductFromCart(id);
    } catch (error) {
      console.log(error);
    }
    revalidatePath('/cart');
  }

  return (
    <div>
      <ul className="-my-6 pb-6 space-y-5 mt-auto mb-auto">
        <li className="grid grid-cols-3 gap-1 h-30  py-6 bg-white rounded-box">
          
          <div className="row-span-2 place-items-center">
            <Image src={imageSrc} width={100} height={100} alt={cartProduct.description}/>
          </div>
          <div className="col-span-2 text-left">
            <h2 className="text-lg font-bold text-left">{cartProduct.name}</h2>
          </div>
          <div>
            <p className="text-sm"><b>Quantity: </b></p>
            <form>
              <input type="number" name="cartQuantity" min="1" max={cartProduct.itemQuantity} placeholder="{quantity}"
                     className="w-1/2 px-2 py-4 text-center border-0 rounded-md bg-gray-50 dark:text-gray-400"
                     ></input>
            </form>
          </div>
          <div>
            <p className="text-sm"><b>Weight: </b>{cartProduct.itemWeight * quantity} lbs </p>
            <p className="text-sm"><b>Price: </b>${(parseFloat(cartProduct.itemPrice) * quantity).toFixed(2)}</p>
            <form action={deleteCartItem}>
              <button className="btn text-center btn-link text-sm">Delete</button>
            </form>
          </div>   
      </li>
      </ul>
    </div>
  );
}