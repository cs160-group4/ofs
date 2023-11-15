import AddProductButtonComponent from '@/components/AddProductModal';
import { RemoveProductForm } from '@/components/RemoveProductForm';
import { getProducts } from '@/lib/products'
import Image from 'next/image'
import { redirect } from "next/navigation";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import Link from 'next/link';
import { Suspense } from 'react';
import { RemoveProductModal } from '@/components/RemoveProductModal';
import { UpdateProduct } from '@/app/ui/admin/products/Buttons';
import { getCategories } from '@/app/lib/categories';

export default async function AdminProducts() {
  const products = await getProducts();
  const categories = await getCategories();
  
  return (
    <>
      <div className='flex flex-col mx-6 pt-7 gap-y-5'>
        {/* title/header */}
        <div className='flex flex-col pb-6 items-center lg:items-start text-center'>
          <h1 className='text-2xl font-bold'>Catalogue</h1>
          <p className='text-base'>Add, delete, or make quick updates to your existing product catalogue</p>
        </div>
        {/* management tools container */}
        <div className='flex justify-between items-center max-w-2xl'>
          <AddProductButtonComponent categories={categories} />

        </div>
        {/* product list items */}
        <div className='overflow-x-auto pb-7'>
          <table className='table bg-base-200'>
            {/* table header */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className='checkbox' />
                  </label>
                </th>
                <th>IMAGE</th>
                <th>ITEM DETAILS</th>
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>WEIGHT</th>
                <th>INVENTORY</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <label>
                      <input type="checkbox" className='checkbox' />
                    </label>
                  </td>
                  <td>
                    <Image src={"/" + product.picture} alt={product.name}
                      width={50} height={50} className="h-[50px]" />
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
                        <RemoveProductForm id={product.id} name={product.name} url={product.picture}/>
                      </Suspense>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </>
  )
}