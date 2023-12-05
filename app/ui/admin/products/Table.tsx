import { RemoveProductForm } from '@/components/RemoveProductForm';
import { UpdateProduct } from '@/app/ui/admin/products/Buttons';
import { getFilteredProduct } from "@/app/lib/products"
import { Suspense } from 'react';
import Image from 'next/image';

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

export default async function ProductTable({query} : {query: string})
{
    const products = await getFilteredProduct(query);
    return (
        <>
            <table className='table table-pin-rows'>
                {/* table header */}
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>IMAGE</th>
                        <th>ITEM DETAILS</th>
                        <th>BRAND</th>
                        <th>CATEGORY</th>
                        <th>PRICE</th>
                        <th>WEIGHT</th>
                        <th>INVENTORY</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                {products.map((product) => (
                    <tr key={product.products.id}>
                    <td></td>
                    <td>
                        {product.products.id}
                    </td>
                    <td>
                        {/* displays either static or uploaded iamge */}
                        {product.products.picture.substring(0, 5).localeCompare("https") === 0 && (
                        <Image src={product.products.picture} alt={product.products.name}
                            width={50} height={50} className="h-[50px]" />
                        )}
                        {product.products.picture.substring(0, 5).localeCompare("https") != 0 && (
                        <Image src={"/" + product.products.picture} alt={product.products.name}
                            width={50} height={50} className="h-[50px]" />
                        )}
                    </td>
                    <td>
                        <div className='flex flex-col'>
                        <p className='font-bold'>{product.products.name}</p>
                        <p>{product.products.description}</p>
                        </div>
                    </td>
                    <td>{product.products.brand}</td>
                    <td>
                        {product.product_categories.name}
                    </td>
                    <td>{product.products.itemPrice}</td>
                    <td>{product.products.itemWeight}</td>
                    <td>{product.products.itemQuantity}</td>
                    <td>
                        <div className='flex gap-3'>
                        <UpdateProduct id={product.products.id} />
                        <Suspense fallback={<p>Deleting...</p>}>
                            <RemoveProductForm id={product.products.id} name={product.products.name} url={product.products.picture} />
                        </Suspense>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}