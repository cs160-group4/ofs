'use server'
import { Categories, getCategories } from '@/lib/categories';
import Link from 'next/link';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function ProductCategoryComponent() {
    const categories = await getCategories();
    return (
        <div className="bg-base-10 gap-4">
            <div className="flex flex-wrap gap-x-8 justify-center p-4 items-center className='bg-primary'">
                <div className="flex items-center">
                    <label htmlFor="my-drawer-2" className="btn btn-ghost xl:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <label htmlFor="my-drawer-2" className="xl:hidden text-accent">Filters</label>
                </div>
                <div>
                    <Link href="/shop/all">All</Link>
                </div>
                {categories.map((category: Categories) => (
                    <div key={category.id}>
                        <Link href={"/shop/" + category.slug.toLowerCase()} key={category.id} >{category.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}