import {FC, ReactNode} from 'react'
import Navbar from '@/components/NavbarComponent'


interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return <div>
        <Navbar />
        {children}
    </div>
}

export default Layout