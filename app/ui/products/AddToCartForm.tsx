'use client'
import { addToCartAction } from '@/actions/cart';
import { Product } from "@/app/lib/products";
import { useState } from "react";
import { SubmitButton, SubmitButtonWithLoading } from '../common/Buttons';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function AddToCartForm({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState(1);
    const [errorMsg, setErrorMsg] = useState("")
    const quantityOptions = (product.itemQuantity > 10000) ? Array.from({ length: 10000 }, (_, index) => index + 1) : Array.from({ length: product.itemQuantity }, (_, index) => index + 1);
    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value));
    };
    const addToCartWithId = addToCartAction.bind(null, product.id, quantity);
    const handleChange = async () => {
        const response: any = await addToCartWithId();
        if (response?.message != null)
            setErrorMsg(response.message)
        else
            setErrorMsg("")
    };
    return (
        <>
            <form action={handleChange}>
                <div className="flex flex-wrap items-center mb-6">
                    <div className="mb-4 mr-4 lg:mb-0">
                        <div className="w-28">
                            <select
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="w-full p-2 border border-gray-300">
                                {quantityOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <SubmitButtonWithLoading text="Add to cart" />
                    {/* <button className="btn btn-primary text-gray-100">Add to cart</button> */}
                </div>
            </form>
            <p className='text-red-500'>{errorMsg}</p>
        </>
    )
}