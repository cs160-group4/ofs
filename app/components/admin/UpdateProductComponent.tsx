'use client'
import { editProduct } from "@/app/actions/products";
import { Product } from "@/app/lib/products";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useEdgeStore } from "@/app/lib/edgestore";
import { useState } from "react";
import { SingleImageDropzone } from "./SingleImageDropzone";


function SubmitButton() {
    const { pending } = useFormStatus()
    
    return (
      <button className='btn btn-primary' type='submit' disabled={pending} aria-disabled={pending}>
        Save
      </button>
    )
  }

export function UpdateProductForm({product}: {product:Product})
{
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();

    return(
        <div className="bg-base-200 rounded-xl px-6 pb-3">
            <form action={async(formData: FormData) => {
                if(file)
                {
                    const res = await edgestore.publicFiles.upload({
                        file,
                        options: {
                            replaceTargetUrl: product.picture
                        }
                    });
                    // console.log(res)
                    // console.log(formData.get("picture"))
                    await editProduct(formData, String(res.url));
                    
                }
                else {
                    await editProduct(formData, product.picture)
                }
            }}>
                <input type="hidden" name="id" value={product.id}/>
                <input type="hidden" name="created" value={String(product.createdAt)} />

                <div className="my-4 flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input placeholder={product.name} defaultValue={product.name} className="input input-borded w-full max-w-xs" type="text" name="name" maxLength={40} required />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="label">
                            <span className="label-text">Slug</span>
                        </label>
                        <input placeholder={String(product.slug)} defaultValue={String(product.slug)} className="input input-borded w-full max-w-xs" type="text" name="slug" required />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="label">
                            <span className="label-text">Brand</span>
                        </label>
                        <input placeholder={product.brand} defaultValue={product.brand} className="input input-borded w-full max-w-xs" type="text" name="brand" required />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className='label'>
                        <span className='label-text'>Category</span>
                        </label>
                        <select defaultValue={product.categoryId} className='w-full select select-bordered' name="category_id" required>
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
                        <input placeholder={String(product.itemWeight)} defaultValue={product.itemWeight} className='w-full input input-bordered' type="number" name="itemWeight" min={1} required />
                    </div>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label className='label'>
                        <span className='label-text'>Quantity</span>
                        </label>
                        <input placeholder={String(product.itemQuantity)} defaultValue={product.itemQuantity} className='w-full input input-bordered' type="number" name="itemQuantity" min={0} required />
                    </div>
                    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                        <label className='label'>
                        <span className='label-text'>Price</span>
                        </label>
                        <input placeholder={product.itemPrice} defaultValue={product.itemPrice} className='w-full input input-bordered' type="text" name="itemPrice" 
                        pattern='(?=.*?\d)^(([1-9]\d{0,4}(,\d{3})*)|\d{9})?(\.\d{1,2})?$' min={0} required />
                    </div>
                </div>
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full px-3'>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <input placeholder={product.description} defaultValue={product.description} className="w-full input input-bordered" type="text" name="description" required/>
                    </div>
                </div>
                {/* <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full px-3'>
                        <label className="label">
                            <span className="label-text">IMG URL (WIP)</span>
                        </label>
                        <input placeholder={product.picture} defaultValue={product.picture} className="w-full input input-bordered" type="text" name="picture" required/>
                    </div>
                </div> */}
                <div className='flex flex-wrap -mx-3 mb-6'>
                    <div className='w-full px-3'>
                        <label className="label">
                            <span className="label-text">Image Upload</span>
                        </label>
                        {/* <input className="w-full file-input" type="file" accept="image/png, image/jpeg" onChange={setFile()}/> */}
                        <SingleImageDropzone
                            width={200}
                            height={200}
                            value={file}
                            onChange={(file) => {
                            setFile(file);
                            }}
                        />
                    </div>
                </div>
                
                <div className="flex justify-end gap-3">
                    <SubmitButton />
                    <Link href="/admin/products" className="btn bg-gray-100" >Cancel</Link>
                </div>
            </form>
        </div>
    )
}