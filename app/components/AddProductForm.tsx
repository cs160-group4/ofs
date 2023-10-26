'use client'
import { createProduct } from 'app/actions'
import {experimental_useFormStatus as useFormStatus } from 'react-dom'
import React from "react"


function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className='btn btn-primary' type='submit' aria-disabled={pending}>
      +  Add Product 
    </button>
  )
}

function LimitedInput( {max, descriptor, name}: {max:number, descriptor:string, name:string}) {
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
          onChange={e => {setCount(e.target.value.length)}} 
          required
        />
    </>
  )
}

export function AddProductForm() {
  return (
    <form id='product-form' action={ createProduct }>
      <div className='form-control w-full my-4'>
        <div className='flex flex-wrap -mx-3 mb-2'>
          <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
            <LimitedInput max={40} descriptor={'Product'} name={'name'}/>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <LimitedInput max={30} descriptor={'Store'} name={'store'}/>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <LimitedInput max={30} descriptor={'Brand'} name={'brand'}/>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className='label'>
              <span className='label-text'>Category</span>
            </label>
            <select defaultValue={'Select a Category'} className='w-full select select-bordered' name="category">
              <option>Fruits</option>
              <option>Dairy</option>
              <option>Vegetables</option>
              <option>Frozen</option>
              <option>Dried Goods</option>
            </select>
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
            <label className='label'>
              <span className='label-text'>Weight in lbs</span>
            </label>
            <input className='w-full input input-bordered ' type="number" name="itemWeight" min={1} required/>
          </div>
          <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
            <label className='label'>
              <span className='label-text'>Price</span>
            </label>
            <input className='w-full input input-bordered' type="number" name="itemPrice" min={0} required/>
          </div>

          <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
            <label className='label'>
              <span className='label-text'>Quantity</span>
            </label>
            <input className='w-full input input-bordered' type="number" name="itemQuantity" min={0} required/>
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <LimitedInput max={100} descriptor={'Description'} name={'description'}/>
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <LimitedInput max={100} descriptor={'Picture(WIP)'} name={'picture'}/>
          </div>
        </div>
      </div>
      <SubmitButton/>
    </form>
  )
}