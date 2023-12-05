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
            if (sort === "Price - Low to High") {
                sortBy = "price";
                sortDirection = "ASC"
            }
            else if (sort === "Price - High to Low") {
                sortBy = "price";
                sortDirection = "DESC"
            }
            else if (sort === "Name - A to Z") {
                sortBy = "name";
                sortDirection = "ASC"
            }
            else if (sort === "Name - Z to A") {
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
            <div className="drawer xl:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <div className="flex flex-wrap justify-center space-evenly">
                        {displayedProducts.map((products: Product) => (
                            <ProductComponent key={products.id} product={products} />
                        ))}
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full  bg-base-100">
                        <FilterList category={slug} brands={brands} checkedBrands={checkedBrands} sort={sort} setSort={setSort} setCheckedBrands={setCheckedBrands} />
                    </ul>

                </div>
            </div>
        </>
    )
}

export default ShopCategory;