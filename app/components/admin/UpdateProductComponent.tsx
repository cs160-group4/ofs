'use client'
import { editProduct } from "@/app/actions/products";
import { Product } from "@/app/lib/products";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { useEdgeStore } from "@/app/lib/edgestore";
import { useState } from "react";
import { SingleImageDropzone } from "./SingleImageDropzone";
import { Categories } from "@/app/lib/categories";


function SubmitButton() {
    const { pending } = useFormStatus()
    
    return (
      <button className='btn btn-primary' type='submit' disabled={pending} aria-disabled={pending}>
        Save
      </button>
    )
}

export function UpdateProductForm({product, categories} : {product:Product, categories:Categories[]})
{
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const MB = 1024 * 1024

    const redirect_catalogue = () => {
        window.location.href = "/admin/products";
    }

    return(
        <>
            {showError === true && (
                <div className="alert alert-error mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{message}</span>
                    <button className="btn btn-sm btn-circle btn-ghost" onClick={() => {
                        setShowError(false)
                        setMessage('')
                    }}>✕</button>
                </div>
                    
            )}
            <dialog id="my_modal" className="modal" {... (success ? {open : true} : {})} onClose={() => {
                redirect_catalogue()
                setSuccess(false)
            }}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Success!</h3>
                    <p className="py-4">Close this window to redirect to the catalogue page</p>
                    <div className="flex flex-wrap w-full justify-end">
                        <form method="dialog">  
                            <button className="btn btn-circle btn-success">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <div className="bg-base-200 rounded-xl px-6 pb-3">
                <form action={async (formData: FormData) => {
                    let res = null
                    if(file)
                    {
                        const fileRes = await edgestore.publicFiles.upload({
                            file,
                            options: {
                                replaceTargetUrl: product.picture,
                            },
                            onProgressChange: (progress) => {
                                setProgress(progress);
                            }
                        });
                        res = await editProduct(formData, String(fileRes.url));
                        
                    }
                    else {
                        res = await editProduct(formData, product.picture)
                    }
                    setMessage(res.message)
                    if(!res.success)
                    {
                        setShowError(true)
                    }
                    else 
                    {
                        setSuccess(true)
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
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
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
                            <SingleImageDropzone
                                width={200}
                                height={200}
                                value={file}
                                dropzoneOptions={{maxSize: 2 * MB}}
                                onChange={(file) => {
                                setFile(file);
                                }}
                            />
                            <div className="w-full h-[8px] border rounded overflow-hidden">
                                <div 
                                    className="h-full bg-info transition-all duration-150" 
                                    style={{
                                        width: `${progress}%`
                                    }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <SubmitButton />
                        <Link href="/admin/products" className="btn bg-gray-100" >Cancel</Link>
                    </div>
                </form>
            </div>
        </>

    )
}