import React from 'react'
'use client'

export const RemoveProductModal = () => {
    return (
        <>
            <button className="btn btn-primary rounded-box w-48" onClick={()=> ((document.getElementById('add-modal') as HTMLDialogElement)).showModal()}>-  Delete</button>
            <dialog id='add-modal' className="modal">
                <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Delete Product?</h3>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    )
}
