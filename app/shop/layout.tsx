import {FC, ReactNode} from 'react'
import Categories from '../components/ProductCategoryComponent'


interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <div>
        <Categories />
        {children}
    </div>
}

export default Layout