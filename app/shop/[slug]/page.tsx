import ProductComponent from '@/components/ProductComponent'
import { getProductByCategory, getProducts } from "@/lib/products";
import { Product } from '@/lib/products'
import Image from 'next/image'
import Link from 'next/link'

export default async function ShopCategory({ params }: { params: { slug: string } }) {
    const { slug } = params;
    let products = [];
    if (slug === 'all') {
        products = await getProducts();
    } else {
        products = await getProductByCategory(slug);
    }

    return (
        <>
            <div className="flex flex-wrap justify-center space-evenly">
                {products.map((product) => (
                    <ProductComponent key={product.id} product={product} />
                ))}
            </div>

            {/* <section className="flex items-center bg-stone-100 lg:h-screen font-poppins dark:bg-gray-800 ">
                <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                   
                    <div className="grid gap-4 mb-11 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductComponent key={product.id} product={product} />
                        ))}
                        </div>
                    <div className="flex justify-center">
                        <a href="#" className="px-4 py-2    ">
                            View More</a>
                    </div>
                </div>
            </section> */}

        </>
    )

}