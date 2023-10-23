import AddProductButtonComponent from '@/components/AddProductModal';
import { RemoveProductForm } from '@/components/RemoveProductForm';
import { getProducts } from '@/lib/products'


export default async function AdminProducts() {
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
            <div className='dropdown dropdown-bottom'>
              <span tabIndex={0} className='menu-dropdown-toggle'>Status</span>
              <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 bg-base-300 rounded-box w-50'>
                <li>Published</li>
                <li>Unpublished</li>
                <li>Draft</li>
              </ul>
            </div>
            
            {/* search */}
          
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
                              <th>STORE</th>
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
                              <td></td>
                              <td>
                                <div className='flex flex-col'>
                                  <p className='font-bold'>{product.name}</p>
                                  <p>{product.description}</p>
                                </div>
                              </td>
                              <td>{product.brand}</td>
                              <td>{product.store}</td>
                              <td>
                                {product.category}
                              </td>
                              <td>{product.itemPrice}</td>
                              <td>{product.itemWeight}</td>
                              <td>{product.itemQuantity}</td>
                              <td><RemoveProductForm prod={product}/></td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>


      </>
    )
}