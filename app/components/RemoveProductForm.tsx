'use client'
import { removeProduct } from "app/actions";
import { useState } from 'react';

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

export function RemoveProductForm({ id, name, url }: { id: number, name: string, url: string }) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button className="rounded-md border p-2 hover:bg-gray-100" onClick={() => { setOpenModal(true) }}>
                <span className="sr-only">Delete</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef3e41" className="w-5 h-5">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                </svg>
            </button>
            <dialog id="my_modal" className="modal" {... (openModal ? { open: true } : {})} onClose={() => setOpenModal(false)}>
                <div className="modal-box">
                    <div className='flex flex-col items-center text-center'>
                        <h3 className="font-bold text-lg">Delete {name}?</h3>
                        <p>Are you sure you would like to delete this item? This action is permanent and cannot be undone</p>
                        <div className="flex w-full justify-evenly gap-3 mt-6">
                            <button type="submit" form={String(id)} className="btn btn-error">
                                Delete
                            </button>
                            <form method="dialog">
                                <button className="btn">
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <form action={async (formData: FormData) => {
                await removeProduct(formData)
                setOpenModal(false)
            }} id={String(id)}>
                <input type="hidden" name="id" value={id} />
            </form>
        </>

    )
}