import Link from 'next/link'

export default function ProductCategoryComponent() {
    return (
        <div className="navbar bg-base-10 p-4">
            <div className="navbar-start"></div>
            <div className="navbar-center space-x-10">
                <Link href="/shop/all">All</Link>
                <Link href="/shop/fruits">Fruits</Link>
                <Link href="/shop/frozen">Frozen</Link>
                <Link href="/shop/dried-goods">Dried Goods</Link>
            </div>
            <div className="navbar-end"></div>
        </div>
    )
}