'use client'
import { useState } from 'react'
import { AddProductForm } from './AddProductForm'


export default function AddProductButtonComponent(){
  const [key, setKey] = useState(Math.random())
  
  return (
    <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn btn-primary rounded-box w-48" onClick={()=> ((document.getElementById('add-modal') as HTMLDialogElement)).showModal()}>+  Add Product</button>
        <dialog id='add-modal' className="modal">
            <div className="modal-box w-8/12 max-w-5xl">
              <form method="dialog">
                <button onClick={() => setKey(Math.random())} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 className="font-bold text-lg">Add a Product to the Catalogue</h3>
              <div className='divider my-3'></div>
              <p>Enter the required product details below</p>
              <AddProductForm key={key}/>
            </div>
            <form onClick={() => setKey(Math.random())} method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>
  )
}