import {FC, ReactNode} from 'react'
import Categories from '@/components/ProductCategoryComponent'

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <div>
        {children}
    </div>
}

export default Layout