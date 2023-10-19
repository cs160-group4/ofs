import { getProducts } from '@/lib/products'


export default async function AdminProduct() {
    const products = await getProducts();
    return (

        <>
         <div className="flex flex-wrap justify-center space-evenly">
        {products.map((product) => (
          <div>{product.name}</div>
        ))}
      </div>

        </>
    )
}


// const page = () => {
//     const [productList, setData] = useState<any[]>([]);

//     useEffect( () => {
//         const fetchProducts = async() => {
//             try {
//                 const response = await fetch("http://localhost:3000/api/basicProduct", {
//                     method: 'GET'
//                 });
//                 setData(await response.json());
//             }
//             catch (error) {
//                 console.error('Error: ', error);
//             }
//         }
//         fetchProducts();
//     }, []);
    
//     return (
//         <>
//             <div className='flex flex-col mx-6 pt-7 gap-y-5'>

//                 {/* title/header */}
//                 <div className='flex flex-col pb-6 items-center lg:items-start text-center'>
//                     <p className='font-bold text-3xl'>Manage Catalogue</p>
//                     <p className='text-base'>Add, filter, or make quick updates to your existing product catalogue</p>
//                 </div>
                
//                 {/* management tools container */}
//                 <div className='flex justify-between items-center max-w-2xl'>
//                     <button className='btn btn-primary rounded-box w-48'>+ Add Item</button>
//                     <div className='dropdown dropdown-bottom'>
//                         <span tabIndex={0} className='menu-dropdown-toggle'>Status</span>
//                         <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 bg-base-300 rounded-box w-50'>
//                             <li>Published</li>
//                             <li>Unpublished</li>
//                             <li>Draft</li>
//                         </ul>
//                     </div>
//                     <input type="text" placeholder='Search...' className='rounded-box pl-4'/>
//                 </div>
//                 {/* product list items */}
//                 <div className='overflow-x-auto pb-7'>
//                     <table className='table bg-base-200'>
//                         {/* table header */}
//                         <thead>
//                             <tr>
//                                 <th>
//                                     <label>
//                                         <input type="checkbox" className='checkbox' />
//                                     </label>
//                                 </th>
//                                 <th>IMAGE</th>
//                                 <th>ITEM DETAILS</th>
//                                 <th>STATUS</th>
//                                 <th>PRICE</th>
//                                 <th>WEIGHT</th>
//                                 <th>INVENTORY</th>
//                             </tr>
                            
//                         </thead>
//                     </table>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default page