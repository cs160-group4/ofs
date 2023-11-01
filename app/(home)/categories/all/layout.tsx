import {FC, ReactNode} from 'react'
import Navbar from '@/app/components/home/Navbar'


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