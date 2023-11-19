'use client';
import { editCategoryAction } from '@/actions/categories';
import { Categories } from '@/app/lib/categories';
import { SubmitButton } from '@/ui/common/Buttons';
import {
    CubeTransparentIcon,
    IdentificationIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState } from 'react-dom';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function EditForm({ category }: { category: Categories }) {
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useFormState(editCategoryAction, initialState);
    return (
        <form action={formAction}>
            <input type="hidden" name="id" defaultValue={category.id} />
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Category name
                    </label>
                    <div className="relative">
                        <input id="name" name="name" type="text" placeholder="Enter category name"
                            defaultValue={category.name}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500  focus:ring-0 focus:ring-gray-500 focus:border-teal-500"
                            aria-describedby="category-error" required minLength={1} maxLength={50} />
                        <CubeTransparentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {state?.errors?.name ? (
                        <div id="category-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                            {state?.errors?.name?.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    {/* Slug */}
                    <label htmlFor="slug" className="mb-2 block text-sm font-medium">
                        Slug
                    </label>
                    <div className="relative">
                        <input id="slug" name="slug" type="text" placeholder="Enter category slug. Example: category-slug"
                            defaultValue={category.slug}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:ring-0 focus:ring-gray-500 focus:border-teal-500"
                            aria-describedby="slug-error" required minLength={1} maxLength={50} />

                        <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {state?.errors?.slug ? (
                        <div id="slug-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                            {state?.errors?.slug?.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}

                </div>
                <div className="mb-4">
                    {/* Description */}
                    <label htmlFor="amount" className="mb-2 block text-sm font-medium">
                        Description
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <textarea id="description" name="description" rows={3} placeholder="Enter category description"
                                defaultValue={category.description as string}
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:ring-0 focus:ring-gray-500 focus:border-teal-500"
                                aria-describedby="description-error" maxLength={100} />
                            <PaperAirplaneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    {state?.errors?.description ? (
                        <div id="description-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                            {state?.errors?.description?.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="mt-4 flex  gap-4">
                <Link href="/admin/categories" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium 
                text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <SubmitButton text="Save" />
            </div>
        </form>
    );
}
