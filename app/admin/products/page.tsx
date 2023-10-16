import React from 'react'

const page = () => {
  return (
    <>
        <div>header</div>
        {/* management tools container */}
        <div className='flex justify-between items-center border-solid border-2 border-white max-w-2xl'>
            <button className='btn btn-primary rounded-box w-48'>+ Add Item</button>
            <div className='dropdown dropdown-bottom'>
                <span tabIndex={0} className='menu-dropdown-toggle bg-white'>Status</span>
                <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 bg-base-300 rounded-box w-50'>
                    <li>Published</li>
                    <li>Unpublished</li>
                    <li>Draft</li>
                </ul>
            </div>
            <input type="text" placeholder='Search...' className='rounded-box pl-4'/>
        </div>

        {/* product list items */}
        <div className='overflow-x-auto'>
            <table className='table'>
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
                        <th>STATUS</th>
                        <th>PRICE</th>
                        <th>INVENTORY</th>
                    </tr>
                </thead>
            </table>
        </div>
    </>
  )
}

export default page