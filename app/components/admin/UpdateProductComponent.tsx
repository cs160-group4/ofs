import { Product } from "@/app/lib/products";

export function UpdateProductForm({product}: {product:Product})
{
    return(
        <div className="bg-base-200 rounded-xl px-6">
            <form action="">
                <div className="my-4 flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-borded w-full max-w-xs" defaultValue={product.name} maxLength={40} />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="label">
                            <span className="label-text">Slug</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-borded w-full max-w-xs" />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="label">
                            <span className="label-text">Brand</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-borded w-full max-w-xs" defaultValue={product.brand} />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className='label'>
                        <span className='label-text'>Category</span>
                        </label>
                        <select defaultValue={'Select a Category'} className='w-full select select-bordered' name="category_id">
                            <option value='1'>Fruits</option>
                            <option value='2'>Frozen</option>
                            <option value='3'>Meats</option>
                            <option value='4'>Dried-Goods</option>
                            <option value='5'>Vegetables</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label className='label'>
                        <span className='label-text'>Weight in lbs</span>
                        </label>
                        <input className='w-full input input-bordered ' type="number" name="itemWeight" min={1} required />
                    </div>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label className='label'>
                        <span className='label-text'>Quantity</span>
                        </label>
                        <input className='w-full input input-bordered' type="number" name="itemQuantity" min={0} required />
                    </div>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label className='label'>
                        <span className='label-text'>Price</span>
                        </label>
                        <input className='w-full input input-bordered' type="text" name="itemPrice" 
                        pattern='(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d{9})?(\.\d{1,2})?$' min={0} required />
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full px-3'>
                        <label className="label">
                            <span className="label-text">IMG URL (WIP)</span>
                        </label>
                        <input className="w-full input input-bordered" type="text" />
                    </div>
                </div>

                <button className="btn btn-primary mb-6" type="submit">Submit</button>
            </form>
        </div>
    )
}