'use client'
import { useState } from 'react'
import { AddProductForm } from './AddProductForm'
import { Categories } from '../lib/categories'

export default function AddProductButtonComponent({categories} : {categories:Categories[]}) {
  const [key, setKey] = useState(Math.random())

  return (
    <>
      <button className="btn btn-primary rounded-box w-48 text-white" onClick={() => ((document.getElementById('add-modal') as HTMLDialogElement)).showModal()}>+  Add Product</button>
      <dialog id='add-modal' className="modal" onClose={() => setKey(Math.random())}>
        <div className="modal-box w-8/12 max-w-5xl">
          <form method="dialog">
            <button onClick={() => (document.getElementById('product-form') as HTMLFormElement).reset()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">Add a Product to the Catalogue</h3>
          <div className='divider my-3'></div>
          <AddProductForm categories={categories} key={key}/>
        </div>
        <form onClick={() => (document.getElementById('product-form') as HTMLFormElement).reset()} method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}