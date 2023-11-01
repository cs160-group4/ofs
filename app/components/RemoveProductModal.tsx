'use client'
import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { RemoveProductForm } from './RemoveProductForm'

export function RemoveProductModal({ id }: {id: number}){
    return (
        <>
            <button className="btn btn-primary rounded-box w-48" onClick={()=> ((document.getElementById('rm-modal') as HTMLDialogElement)).showModal()}>
                <TrashIcon className="w-5" />
            </button>
            <dialog id='rm-modal' className="modal">
                <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Delete Product?</h3>
                <RemoveProductForm id={id} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
