import { Cart, CartItem, deleteProductFromCart } from '@/lib/cart';
import { Product, getProductById } from '@/lib/products';
import { revalidatePath } from 'next/cache'
import Image from 'next/image';
import React from 'react';
import { User } from '@/lib/users';
import { getAuthSession } from '../api/auth/[...nextauth]/options';


export async function CartItemCard({ item }: {item: CartItem }) {

  var user_id = "";
  const session = await getAuthSession();

  if (session?.user) {
      user_id = session.user.id as string;
  }

  let cart = item.cart;
  let product = item.products;
  const imageSrc = `/${product.picture}`;

  const deleteCartItem = async () => {
    'use server'
    try {
      await deleteProductFromCart(item.cart.id, user_id);
    } catch (error) {
      console.log(error);
    }
    revalidatePath('/cart');
  }

  return (
    <div>
      <ul className="my-2 pb-2 space-y-2 mt-auto mb-auto">
        <li className="grid grid-cols-3 gap-1 py-2 bg-white rounded-box items-center justify-center">
          <div className="row-span-2 items-center m-2 ps-6">
            <Image src={imageSrc} width={50} height={50} alt={product.description} />
          </div>
          <div className="col-span-2 text-left">
            <h2 className="text-lg font-bold text-left">{product.name}</h2>
          </div>
          <div>
            <p className="text-sm"><b>Quantity: </b></p>
            <form>
              <input type="number" name="cartQuantity" min="1" max={product.itemQuantity} placeholder={cart.quantity.toString()} 
                defaultValue={cart.quantity}
                className="w-1/2 px-2 py-4 text-center border-0 rounded-md bg-gray-50 dark:text-gray-400"
              ></input>
            </form>
          </div>
          <div>
            <p className="text-sm"><b>Weight: </b>{product.itemWeight * cart.quantity} lbs </p>
            <p className="text-sm"><b>Price: </b>${(parseFloat(product.itemPrice) * cart.quantity).toFixed(2)}</p>
            <form action={deleteCartItem}>
              <button className="btn text-center btn-link text-sm">Delete</button>
            </form>
          </div>
        </li>
      </ul>
    </div>
  );
}