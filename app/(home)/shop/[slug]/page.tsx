'use client'

import FilterList from '@/components/FilterList';
import ProductComponent from '@/components/ProductComponent'
import { Product } from '@/lib/products';
import { useEffect, useState } from 'react';

const ShopCategory = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const [products, setProducts] = useState<any>([]);
    const [displayedProducts, setdisplayedProducts] = useState<any>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
    const [priceSort, setPriceSort] = useState<string>("ASC");
    const [nameSort, setNameSort] = useState<string>("ASC");
    let host = process.env.NEXTAUTH_URL;
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (slug === 'all' || slug === 'All') {
                    const response = await fetch("/api/productByCategory?name=%&priceSort=" + priceSort + "&nameSort=" + nameSort, {
                        method: 'GET',
                    });
                    setProducts(await response.json());
                }
                else {
                    const response = await fetch("/api/productByCategory?name=" + slug + "&priceSort=" + priceSort + "&nameSort=" + nameSort, {
                        method: 'GET',
                    });
                    setProducts(await response.json());
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [slug, nameSort, priceSort])

    useEffect(() => {
        let brandSet: Set<string> = new Set();
        products.forEach((element: Product) => {
            brandSet.add(element.brand);
        });
        setBrands(Array.from(brandSet));
        setCheckedBrands(Array.from(brandSet));
    }, [products])

    useEffect(() => {
        setdisplayedProducts(products.filter((product: Product) => {
            return checkedBrands.includes(product.brand);
        }));
    }, [checkedBrands, products])


    return (
        <>
            <div className='flex '>
                <div className="p-3">
                    <FilterList category={slug} brands={brands} checkedBrands={checkedBrands} nameSort={nameSort} priceSort={priceSort} setNameSort={setNameSort} setPriceSort={setPriceSort} setCheckedBrands={setCheckedBrands} />
                </div>
                <div className="flex flex-wrap justify-center space-evenly">
                    {displayedProducts.map((products: Product) => (
                        <ProductComponent key={products.id} product={products} />
                    ))}
                </div>
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

export default ShopCategory;