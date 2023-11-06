import { FC, ReactNode } from 'react'
import Categories from '@/components/ProductCategoryComponent'

export default function ShopLayout({ children, }: { children: React.ReactNode }) {
    return (
        <>
            <Categories />
            {children}
        </>
    )
}