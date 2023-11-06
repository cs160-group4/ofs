import {FC, ReactNode} from 'react'
import Navbar from '@/app/ui/home/Navbar'


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