'use client'
import { createProduct } from 'app/actions'
import {experimental_useFormStatus as useFormStatus } from 'react-dom'


function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type='submit' aria-disabled={pending}>
      +  Add Product 
    </button>
  )
}


export function AddProductForm() {
  return (
    <form action={ createProduct }>
      <div className='form-control w-full max-w-xs'>
        <label>name</label>
        <input type="text" name="name" required/>

        <label>desc</label>
        <input type="text" name="description"/>

        <label>store</label>
        <input type="text" name="store" required/>

        <label>category</label>
        <input type="text" name="category" required/>

        <label>pciture</label>
        <input type="text" name="picture"/>

        <label>weight</label>
        <input type="number" name="itemWeight" required/>

        <label>price</label>
        <input type="text" name="itemPrice" required/>

        <label>amount</label>
        <input type="number" name="itemQuantity" required/>
      </div>
      <SubmitButton/>
    </form>
  )
}