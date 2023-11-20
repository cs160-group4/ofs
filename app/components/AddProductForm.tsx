'use client'
import { Categories } from '@/lib/categories'
import { useEdgeStore } from '@/lib/edgestore'
import { createProduct } from 'app/actions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from "react"
import { useFormStatus } from 'react-dom'
import { SingleImageDropzone } from './admin/SingleImageDropzone'

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button className='btn btn-primary text-white' type='submit' disabled={pending} aria-disabled={pending}>
      +  Add Product
    </button>
  )
}

function LimitedInput({ max, descriptor, name, regex }: { max: number, descriptor: string, name: string, regex: string}) {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <label className='label'>
        <span className='label-text'>{descriptor}</span>
        <span className="label-text-alt">{max - count}</span>
      </label>
      <input
        type="text"
        name={name}
        placeholder={descriptor}
        maxLength={max}
        className='input input-bordered w-full'
        onChange={e => { setCount(e.target.value.length) }}
        pattern={regex}
        required
      />
    </>
  )
}

export function AddProductForm({ categories }: { categories: Categories[] }) {
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const MB: number = 1024 * 1024;

  /* Close Dialog and add a success param to the url - by Hung Pham on 2023-11-16 */
  const closeDialog = () => {
    const dialog = document.getElementById('add-modal') as HTMLDialogElement;
    dialog.close();
  }
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const setSuccessParam = useCallback((success: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set('status', success ? 'added' : 'error')
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, replace, pathname]);
  /* End - by Hung Pham on 2023-11-16 */

  return (
    <form id='product-form' action={async (formData: FormData) => {
      if (file) {
        const fileRes = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            setProgress(progress);
          }
        });
        console.log(fileRes.url)
        const res = await createProduct(formData, String(fileRes.url));
        // setShowAlert(true);
        // setMessage(res.message);
        // setShowError(!res.success);
        setSuccessParam(res.success); //  Hung Pham on 2023-11-16
        closeDialog(); //  Hung Pham on 2023-11-16
        // if (res.success) {
        //   try {
        //     await edgestore.publicFiles.confirmUpload({
        //       url: fileRes.url
        //     });
        //   }
        //   catch (error) {
        //     console.log(error)
        //     setMessage("Unable to Confirm Upload, Try Again")
        //     setShowError(true)
        //   }
        // }
        // else if (!res.success) {
        //   setShowError(true)
        // }
      }
      else {
        setMessage("Missing Image");
        setShowAlert(true);
        setShowError(true);
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
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{message}</span>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={() => {
            setShowAlert(false)
            setShowError(false)
            setMessage('')
          }}>✕</button>
        </div>
      )}
      <div className='form-control w-full my-4'>
        <div className='flex flex-wrap -mx-3 mb-2'>
          <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
            <LimitedInput max={40} descriptor={'Product'} name={'name'} regex=''/>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <LimitedInput max={30} descriptor={'Slug'} name={'slug'} regex='^([a-zA-Z]+((-[a-zA-Z]+)?)*)$' />
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <LimitedInput max={30} descriptor={'Brand'} name={'brand'} regex=''/>
          </div>
          <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
            <label className='label'>
              <span className='label-text'>Category</span>
            </label>
            <select defaultValue={'Select a Category'} className='w-full select select-bordered' name="category_id">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
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
              <span className='label-text'>Quantity</span>
            </label>
            <input className='w-full input input-bordered' type="number" name="itemQuantity" min={0} required />
          </div>
          <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
            <label className='label'>
              <span className='label-text'>Price</span>
            </label>
            <input className='w-full input input-bordered' type="text" name="itemPrice"
              pattern='(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d{9})?(\.\d{1,2})?$' min={0} required />
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <LimitedInput max={100} descriptor={'Description'} name={'description'} regex='' />
          </div>
        </div>
        {/* <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <LimitedInput max={100} descriptor={'Picture(WIP)'} name={'picture'} />
          </div>
        </div> */}
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label className="label">
              <span className="label-text">Image Upload</span>
            </label>
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              dropzoneOptions={{ maxSize: 2 * MB }}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <div className="w-full h-[8px] border rounded overflow-hidden">
              <div
                className="h-full bg-info transition-all duration-150"
                style={{
                  width: `${progress}%`
                }}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubmitButton />
    </form>
  )
}