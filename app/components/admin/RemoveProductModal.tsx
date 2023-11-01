'use client'
import React from 'react'
import { RemoveProductForm } from './RemoveProductForm'
import { TrashIcon } from '@heroicons/react/24/outline'

export function RemoveProductModal({ id }: { id: number}){
    return (
        <>
            <button className="btn btn-error btn-md rounded-box w-30" onClick={()=> ((document.getElementById(id.toString()) as HTMLDialogElement)).showModal()}>
                <TrashIcon className="w-5" />
            </button>
            <dialog id={id.toString()} className="modal">
                <div className="modal-box">
                    <div className='flex flex-col  items-center text-center'>
                        <h3 className="font-bold text-lg">Delete this Product?</h3>
                        <p>Are you sure you would like to delete this item? This action is permanent and cannot be undone</p>
                        <div className='flex mt-6'>
                            <RemoveProductForm id={id}/>
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
