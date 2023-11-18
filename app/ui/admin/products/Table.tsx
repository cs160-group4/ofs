import { RemoveProductForm } from '@/components/RemoveProductForm';
import { UpdateProduct } from '@/app/ui/admin/products/Buttons';
import { getFilteredProduct } from "@/app/lib/products"
import { Suspense } from 'react';
import Image from 'next/image';

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
                    <tr key={product.id}>
                    <td></td>
                    <td>
                        {product.id}
                    </td>
                    <td>
                        {/* tentative change, can remove once all images are stored */}
                        {product.picture.substring(0, 5).localeCompare("https") === 0 && (
                        <Image src={product.picture} alt={product.name}
                            width={50} height={50} className="h-[50px]" />
                        )}
                        {product.picture.substring(0, 5).localeCompare("https") != 0 && (
                        <Image src={"/" + product.picture} alt={product.name}
                            width={50} height={50} className="h-[50px]" />
                        )}
                    </td>
                    <td>
                        <div className='flex flex-col'>
                        <p className='font-bold'>{product.name}</p>
                        <p>{product.description}</p>
                        </div>
                    </td>
                    <td>{product.brand}</td>
                    <td>
                        {product.slug}
                    </td>
                    <td>{product.itemPrice}</td>
                    <td>{product.itemWeight}</td>
                    <td>{product.itemQuantity}</td>
                    <td>
                        <div className='flex gap-3'>
                        <UpdateProduct id={product.id} />
                        <Suspense fallback={<p>Deleting...</p>}>
                            <RemoveProductForm id={product.id} name={product.name} url={product.picture} />
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