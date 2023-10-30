'use client'
import { createProduct } from '@/actions/products'
import {experimental_useFormStatus as useFormStatus, experimental_useFormState as useFormState } from 'react-dom'
import React from "react"


const initialState = {
  message: null,
}


function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className='btn btn-primary' type='submit' aria-disabled={pending}>
      +  Add
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

function SubmitMsg({message}: {message:String}) {
  return(
      <div id="alert-1" className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
      <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
    <span className="sr-only">Info</span>
    <div className="ml-3 text-sm font-medium">
      A simple info alert with an <a href="#" className="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like.
    </div>
      <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="alert-1" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
    </div>
  )
}

export function AddProductForm() {
  const [state, formAction] = useFormState(createProduct, initialState)
  const [showAlert, setShowAlert] = React.useState(false)

  return (
    <>
      {showAlert != false && (
        <div>
          { state?.success === true && (
            <div className="alert alert-success mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{state?.message}</span>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setShowAlert(false)}>✕</button>
            </div>
          )}
          { state?.success === false && (
            <div className="alert alert-error mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{state?.message}</span>
              <button className="btn btn-sm btn-circle btn-ghost" onClick={() => setShowAlert(false)}>✕</button>
            </div>
          )}
        </div>
      )}

      <form id='product-form' action={ formAction } onSubmit={() => setShowAlert(true)}>
        <div className='form-control w-full my-4'>
          <div className='flex flex-wrap -mx-3 mb-2'>
            <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
              <LimitedInput max={40} descriptor={'Product'} name={'name'}/>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <LimitedInput max={30} descriptor={'Slug'} name={'slug'}/>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
              <LimitedInput max={30} descriptor={'Brand'} name={'brand'}/>
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

        <SubmitButton />
      </form>
      
    </>
  )
}