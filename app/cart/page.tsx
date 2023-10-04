import React from 'react'

const page = () => {
  return (
    <div className="container mx-auto px-6 pt-7 bg-base-100 h-screen xl:px-0">
        <div className="flex pb-6 justify-center md:justify-start">
            <h1 className="text-3xl">Shopping Cart</h1> 
        </div>
        
        <div className="mx-auto justify-center md:flex md:space-x-6">
            <div className="rounded-lg md:w-3/5">
                <div className="justify-between mb-5 rounded-lg w-full p-6 bg-white sm:flex sm:justify-start">
                    {/* shopping items */}
                    <div className="flex flex-col w-full mt-6">
                        <div className="flow-root">
                            <ul className="-my-6 pb-6 divide-y space-y-5 divide-white-100">
                                <li className="flex h-30 content-center py-6 bg-red-300 rounded-box place-items center">
                                    img 
                                    <div className="mt-5 sm:mt-0">
                                        <div>
                                            <h2 className="text-lg font-bold">Product Title</h2>
                                            <p className="mt-1 text-s">Product Desc.</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="flex h-30 content-center py-6 bg-red-300 rounded-box place-items center">
                                    img 
                                    <div className="mt-5 sm:mt-0">
                                        <div>
                                            <h2 className="text-lg font-bold">Product Title</h2>
                                            <p className="mt-1 text-s">Product Desc.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* price totals */}
            <div className="container mt-6 h-full rounded-lg border bg-white shadow-md md:mt-0 md:w-2/5 px-3 py-3">
                <div className="mb-2 flex justify-between">
                    <p>Subtotal</p>
                    <p>price</p>
                </div>
                <div className="mb-2 flex justify-between">
                    <p>Shipping</p>
                    <p>price</p>
                </div>
                <hr className="my-5"></hr>
                <div className="flex justify-between font=bold text-xl">
                    <p>Total</p>
                    <p>price..</p>
                </div>
                <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium hover:bg-blue-600">Check Out</button>
            </div>
        </div>
        
    </div>
  )
}

export default page