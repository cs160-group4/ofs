import { FC, ReactNode } from 'react'
import Categories from '@/components/ProductCategoryComponent'

/*
  Authors: Aaron Low <aaron.c.low@sjsu.edu>, Hung Pham <mryo.hp@gmail.com>
  Copyright (c) 2023. All rights reserved.
*/

export default function ShopLayout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <Categories />
            {children}
        </>
    )
}