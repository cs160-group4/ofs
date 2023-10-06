import Link from 'next/link'
import logo from "../public/images/logo.png"

export default function NavbarComponent() {
    return (
            <div className="navbar bg-base-10 p-4">
                <div className="navbar-start"></div>
                <div className="navbar-center space-x-10">
                    <Link className="text-white" href="/categories/all">All</Link>
                    <Link className="text-white" href="/">Fruits</Link>
                    <Link className="text-white" href="/">Frozen</Link>
                    <Link className="text-white" href="/">Dried Goods</Link>
                </div>
                <div className="navbar-end"></div>
            </div>
    )
}