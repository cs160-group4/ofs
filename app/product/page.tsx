'use client'
import {FC, useEffect, useState} from 'react'
import Image from 'next/image'

interface pageProps {
    searchParams : any
}

const page: FC<pageProps> = ({searchParams}) => {

    const [productData, setData] = useState<any[]>([]);

    useEffect( () => {
        const fetchProducts = async() => {
            try {
                const response = await fetch("http://localhost:3000/api/product", {
                    method: 'POST',
                    body: JSON.stringify({ id : searchParams.productID})
                });
                setData(await response.json());
            }
            catch (error) {
                console.error('Error: ', error);
            }
        }
        fetchProducts();
    }, []);

    return <div> 
            <div className='bg-white flex'>
                {productData[0] && (
                    <Image 
                        src={'/images/food/'+productData[0].productPictureLink} 
                        alt={productData[0].productName} 
                        width={150} height={150}
                        className='flex-grow bg-red-500 max-w-screen-sm max-h-screen-sm m-4'
                    />
                )}
                {productData[0] && (
                    <div className='flex-grow bg-blue-500 p-4 w-max'>
                        <div className="text-black text-2xl mb-4">{productData[0].productName}</div>
                        <div className="text-black">Brand: {productData[0].productBrand}</div>
                        <div className="text-black">Category: {productData[0].productCategory}</div>
                        <div className="text-black">Description: {productData[0].productDescription}</div>
                        <div className="text-black">Weight: {productData[0].itemWeight}</div>
                        <div className="text-black">Price: {productData[0].itemPrice}</div>
                        <div className="text-black">Quanitty: {productData[0].itemWeight}</div>
                        <div className='flex'>
                            <label htmlFor="itemQuantity" className="block text-gray-900 dark:text-white">Quantity: </label>
                            <input type="text" id="itemQuantity" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 ml-4 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required></input>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>
        </div>
}

export default page
