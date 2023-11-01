import AddProductButtonComponent from '@/components/admin/AddProductModal';
import { RemoveProductModal } from '@/components/admin/RemoveProductModal';
import { getProducts } from '@/lib/products'
import Image from 'next/image'
import { redirect } from "next/navigation";
import { getAuthSession } from "@/api/auth/[...nextauth]/options";
import Link from 'next/link';

function sortSelect() {
  <select name="sort-product" id="sort-product">
    <option value=""></option>
    <option value=""></option>
    <option value=""></option>
    <option value=""></option>
  </select>
}


export default async function AdminProducts() {
  // const session = await getAuthSession();
  // if (!session || !session.user || session.user.role !== "admin") {
  //   return <>
  //     <div className="flex flex-col justify-center items-center h-96">
  //        <h1 className='text-3xl font-bold m-12'>You are not authorized to view this page</h1>

  //       <div>
  //         <Link href="/" className='btn btn-primary text-white'>Go back to home page</Link>
  //         </div>
  //     </div>
  //   </>
  // }

  const products = await getProducts();
  
  return (

    <>
      <div className='flex flex-col mx-6 pt-7 gap-y-5'>

        {/* title/header */}
        <div className='flex flex-col pb-6 items-center lg:items-start text-center'>
          <p className='font-bold text-3xl'>Manage Catalogue</p>
          <p className='text-base'>Add, filter, or make quick updates to your existing product catalogue</p>
        </div>   

        {/* management tools container */}
        <div className='flex justify-between items-center max-w-2xl'>
          <AddProductButtonComponent />
        </div>

        {/* product list items */}
        <div className='overflow-x-auto pb-7'>
          <table className='table bg-base-200'>
            {/* table header */}
            <thead>
              <tr>
                <th></th>
                <th>IMAGE</th>
                <th>ITEM DETAILS</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th>WEIGHT</th>
                <th>INVENTORY</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td></td>
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
                  <td>{product.itemPrice}</td>
                  <td>{product.itemWeight}</td>
                  <td>{product.itemQuantity}</td>
                  <td><RemoveProductModal product={product}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )}