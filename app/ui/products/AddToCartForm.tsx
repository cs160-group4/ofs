'use client'
import { addToCartAction } from '@/actions/cart';
import { Product } from "@/app/lib/products";
import { useState } from "react";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function AddToCartForm({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const quantityOptions = Array.from({ length: product.itemQuantity }, (_, index) => index + 1);
    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value));
    };
    const addToCartWithId = addToCartAction.bind(null, product.id, quantity);
    return (
        <>
            <form action={addToCartWithId}>
                <div className="flex flex-wrap items-center mb-6">
                    <div className="mb-4 mr-4 lg:mb-0">
                        <div className="w-28">
                            <select

                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-full p-2 border border-gray-300"
                            >
                                {quantityOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button className="btn btn-primary text-gray-100">Add to cart</button>
                </div>
            </form>
        </>
    )
}