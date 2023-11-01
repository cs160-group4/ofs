'use client'
import { createProduct } from 'app/actions'
import { useFormStatus } from 'react-dom'
import React, { useState } from "react"


function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className='btn btn-primary' type='submit' aria-disabled={pending}>
      +  Add Product
    </button>
  )
}

function LimitedInput({ max, descriptor, name }: { max: number, descriptor: string, name: string }) {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <label className='label'>
        <span className='label-text'>{descriptor}</span>
        <span className="label-text-alt">characters left: {max - count}</span>
      </label>
      <input
        type="text"
        name={name}
        placeholder={descriptor}
        maxLength={max}
        className='input input-bordered w-full'
        onChange={e => { setCount(e.target.value.length) }}
        required
      />
    </>
  )
}

export function AddProductForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState('')
  return (
    <form id='product-form' action={async (formData: FormData) => {
      const res = await createProduct(formData);
      setShowAlert(true);
      setMessage(res.message)
      if(!res.success)
      {
        setShowError(true)
      }
    }}>
      {showAlert != false && showError != true && (
          <div className='alert alert-success mb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{message}</span>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={() => {
              setShowAlert(false)
              setMessage('')
            }}>✕</button>
          </div>
      )}
      {showAlert != false && showError != false && (
          <div className='alert alert-error mb-3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{message}</span>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={() => {
              setShowAlert(false)
              setMessage('')
            }}>✕</button>
          </div>
      )}
      <div className='form-control w-full my-4'>
        <div className='flex flex-wrap -mx-3 mb-2'>
          <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
            <LimitedInput max={40} descriptor={'Product'} name={'name'} />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <LimitedInput max={30} descriptor={'Slug'} name={'slug'} />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <LimitedInput max={30} descriptor={'Brand'} name={'brand'} />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className='label'>
              <span className='label-text'>Category</span>
            </label>
            <select defaultValue={'Select a Category'} className='w-full select select-bordered' name="category_id">
              <option value='1'>Fruits</option>
              <option value='2'>Frozen</option>
              <option value='3'>Meats</option>
              <option value='4'>Dried-Goods</option>
              <option value='5'>Vegetables</option>
            </select>
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
            <label className='label'>
              <span className='label-text'>Weight in lbs</span>
            </label>
            <input className='w-full input input-bordered ' type="number" name="itemWeight" min={1} required />
          </div>
          <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
            <label className='label'>
              <span className='label-text'>Price</span>
            </label>
            <input className='w-full input input-bordered' type="text" name="itemPrice" 
              pattern='(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d{9})?(\.\d{1,2})?$' min={0} required />
          </div>

          <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
            <label className='label'>
              <span className='label-text'>Quantity</span>
            </label>
            <input className='w-full input input-bordered' type="number" name="itemQuantity" min={0} required />
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <LimitedInput max={100} descriptor={'Description'} name={'description'} />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <LimitedInput max={100} descriptor={'Picture(WIP)'} name={'picture'} />
          </div>
        </div>

      </div>
      <SubmitButton />
    </form>
  )
}