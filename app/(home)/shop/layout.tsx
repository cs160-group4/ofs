import { FC, ReactNode } from 'react'
import Categories from '@/components/ProductCategoryComponent'


/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export default function ShopLayout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <Categories />
            {children}
        </>
    )
}