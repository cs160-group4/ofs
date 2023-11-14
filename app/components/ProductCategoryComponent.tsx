import { get } from 'http'
import Link from 'next/link'
import { Categories, getCategories } from '@/lib/categories';

export default async function ProductCategoryComponent() {
    const categories = await getCategories();
    return (
        <div className="navbar bg-base-10 p-4">
            <div className="navbar-start"></div>
            <div className="navbar-center space-x-10">
                <Link href="/shop/all">All</Link>
                {categories.map((category: Categories) => (
                    <Link href={"/shop/" + category.slug.toLowerCase()} key={category.id}>{category.name}</Link>
                ))}

                {/* <Link href="/shop/all">All</Link>
                <Link href="/shop/fruits">Fruits</Link>
                <Link href="/shop/frozen">Frozen</Link>
                <Link href="/shop/dried-goods">Dried Goods</Link> */}
            </div>
            <div className="navbar-end"></div>
        </div>
    )
}