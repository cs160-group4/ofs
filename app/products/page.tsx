import Image from 'next/image'
import { getProducts, getProductById } from "@/lib/products";

export default async function products() {
    const products = await getProducts();
    return <div>
        <div className='bg-white flex'>
            {products[0] && (
                <Image
                    src={'/images/food/' + products[0].picture}
                    alt={products[0].name}
                    width={150} height={150}
                    className='flex-grow bg-red-500 max-w-screen-sm max-h-screen-sm m-4'
                />
            )}
            {products[0] && (
                <div className='flex-grow bg-blue-500 p-4 w-max'>
                    <div className="text-black text-2xl mb-4">{products[0].name}</div>
                    <div className="text-black">Brand: {products[0].store}</div>
                    <div className="text-black">Category: {products[0].category}</div>
                    <div className="text-black">Description: {products[0].description}</div>
                    <div className="text-black">Weight: {products[0].itemWeight}</div>
                    <div className="text-black">Price: {products[0].itemPrice}</div>
                    <div className="text-black">Quanitty: {products[0].itemWeight}</div>
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

