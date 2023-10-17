'use client'
import {FC, useState, useEffect} from 'react'
import Product from '@/components/ProductComponent'

interface pageProps {}

export default function CategoryPage({ params }: { params: { slug: string } }) {
    
    const [productList, setData] = useState<any[]>([]);

    useEffect( () => {
        const fetchProducts = async() => {
            try {
                const response = await fetch("http://localhost:3000/api/basicProduct", {
                    method: 'GET'
                });
                setData(await response.json());
            }
            catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <>
            <div className="flex flex-col p-2">
                <p className="mt-3 text-2xl">Category: {params.slug}</p>
            </div>
            <div className="flex">
                <div className="flex-shrink bg-blue-500 p-4 w-80">
                    <h6 className='text-lg font-large text-gray-900'>Filters</h6>
                    <div className="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                    </div>
                    <div className="flex items-center">
                        <input id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Checked state</label>
                    </div>
                </div>
                <div className="flex-grow bg-red-500 p-4">
                    {productList && (
                        <div className="flex flex-wrap">
                            {productList.map(data => (
                                <Product key={data.productID} productData={data}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )

}