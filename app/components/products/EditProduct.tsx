'use client';

import {
    CheckIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
// import { Button } from '../button';
import { editProduct } from '@/actions/products';
import { useFormState } from 'react-dom';
import { Product } from '@/lib/products';
// import Categories from 'app/categories/all/page';
import { Categories, getCategories } from '@/lib/categories';

export default function EditProductForm({ product, categories }: { product: Product, categories: Categories[] }) {
    const initialState = { message: null, errors: {} };
    // const [state, dispatch] = useFormState(editProduct, initialState);

    return (
        <>
            {/* <form action={dispatch}> */}
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Product ID */}
                <input type="hidden" name="id" value={product.id} />
                {/* Customer Name */}
                <div className="mb-4">
                    <label htmlFor="customer" className="mb-2 block text-sm font-medium">
                        Choose category
                    </label>
                    <div className="relative">
                        <select
                            id="customer"
                            name="customerId"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={product.categoryId}
                            aria-describedby="customer-error"
                        >
                            <option value="" disabled>
                                Select a customer
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
                    </div>

                    {/* {state.errors?.productId ? (
                        <div
                            id="product-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.productId.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null} */}
                </div>

                {/* Product Amount */}
                {/* <div className="mb-4">
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Choose an amount
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                defaultValue={product.amount}
                                placeholder="Enter USD amount"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="amount-error"
                            />
                            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>

                    {state.errors?.amount ? (
                        <div
                            id="amount-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.amount.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div> */}

                {/*  Status */}
                {/* <div>
                    {state.errors?.status ? (
                        <div
                            aria-describedby="status-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.status.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div> */}

                {/* {state.message ? (
                    <div aria-live="polite" className="my-2 text-sm text-red-500">
                        <p>{state.message}</p>
                    </div>
                ) : null} */}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link href="/admin/products" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <button type="submit" className="btn btn-primary"> Save </button>
            </div>
            {/* </form> */}
        </>

    );
}
