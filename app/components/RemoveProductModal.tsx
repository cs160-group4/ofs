'use client'
import React from 'react'
import { experimental_useFormStatus as useFormStatus} from "react-dom"
import { RemoveProductForm } from './RemoveProductForm'
import { Product } from '@/lib/products'

export function RemoveProductModal({ product }: { product:Product}){
    return (
        <>
            <button className="btn btn-error btn-md rounded-box w-30" onClick={()=> ((document.getElementById(product.id.toString()) as HTMLDialogElement)).showModal()}>Delete</button>
            <dialog id={product.id.toString()} className="modal">
                <div className="modal-box">
                    <div className='flex flex-col items-center'>
                        <h3 className="font-bold text-lg">Delete this Product?</h3>
                        <p>Are you sure you would like to delete {product.name}? This action is permanent and cannot be undone</p>
                        <div className='flex mt-6'>
                            <RemoveProductForm product={product}/>
                            <form method='dialog'>
                                <button className='btn rounded-box ml-12'>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
