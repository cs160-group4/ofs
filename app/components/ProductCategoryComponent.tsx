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
        <div className="navbar bg-base-10 p-4">
            <div className="navbar-start"></div>
            <div className="navbar-center space-x-10">
                <Link href="/shop/all">All</Link>
                {categories.map((category: Categories) => (
                    <Link href={"/shop/" + category.slug.toLowerCase()} key={category.id}>{category.name}</Link>
                ))}
            </div>
            <div className="navbar-end"></div>
        </div>
    )
}