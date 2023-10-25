'use client'
import React from 'react'
import { experimental_useFormStatus as useFormStatus} from "react-dom"
import { RemoveProductForm } from './RemoveProductForm'
import { Product } from '@/lib/products'

export function RemoveProductModal({ prod }: { prod:Product}){
    return (
        <>
            <button className="btn btn-primary rounded-box w-48" onClick={()=> ((document.getElementById('rm-modal') as HTMLDialogElement)).showModal()}>-  Delete</button>
            <dialog id='rm-modal' className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Delete Product?</h3>
                    <RemoveProductForm product={prod}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
