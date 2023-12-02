'use client'

import FilterList from '@/components/FilterList';
import ProductComponent from '@/components/ProductComponent'
import { Product } from '@/lib/products';
import { useEffect, useState } from 'react';

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

const ShopCategory = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const [products, setProducts] = useState<any>([]);
    const [displayedProducts, setdisplayedProducts] = useState<any>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
    const [sort, setSort] = useState<string>("Price - Low to High");
    useEffect(() => {
        const fetchData = async () => {
            let sortBy = ""
            let sortDirection = ""
            if(sort === "Price - Low to High")
            {
                sortBy = "price";
                sortDirection = "ASC"
            }
            else if(sort === "Price - High to Low")
            {
                sortBy = "price";
                sortDirection = "DESC"
            }
            else if(sort === "Name - A to Z")
            {
                sortBy = "name";
                sortDirection = "ASC"
            }
            else if(sort === "Name - Z to A")
            {
                sortBy = "name";
                sortDirection = "DESC"
            }

            try {
                if (slug === 'all' || slug === 'All') {
                    const response = await fetch("/api/productByCategory?slug=%&sortBy=" + sortBy + "&sortDirection=" + sortDirection, {
                        method: 'GET',
                    });
                    setProducts(await response.json());
                }
                else {
                    const response = await fetch("/api/productByCategory?slug=" + slug + "&sortBy=" + sortBy + "&sortDirection=" + sortDirection, {
                        method: 'GET',
                    });
                    setProducts(await response.json());
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [slug, sort])

    useEffect(() => {
        let brandSet: Set<string> = new Set();
        products.forEach((element: Product) => {
            brandSet.add(element.brand);
        });
        let sortedBrands = Array.from(brandSet).sort();
        setBrands(sortedBrands);
        setCheckedBrands(sortedBrands);
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
                    <FilterList category={slug} brands={brands} checkedBrands={checkedBrands} sort={sort} setSort={setSort} setCheckedBrands={setCheckedBrands} />
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