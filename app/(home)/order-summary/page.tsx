import Image from 'next/image'
import Link from 'next/link'
import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import React from 'react';
export default async function OrderSummary() {
    const session = await getAuthSession();
    const name = session?.user?.name;

    if(!name) {
        return <main className="flex items-center justify-center h-screen">
                    <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                        <div className="flex flex-col items-center">
                            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                                <span className="text-black">Please Login Before You<br></br>Can See Your Order Summary</span> 
                            </h6>
                            <Link href="/auth/signin" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </main>
    }

    return (
        <section className="flex items-center py-16 font-poppins ">
            <div
                className="justify-center flex-1 max-w-4xl px-6 py-6 mx-auto bg-gray-100 rounded-md shadow-md ">
                <div className="mb-16 text-center">
                    <h1
                        className="mb-6 text-2xl font-semibold leading-7 tracking-wide text-gray-700 lg:text-4xl dark:text-gray-300 lg:leading-9">
                        Thank you for your order{name ? `, ${name}!` : ''}</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">your order number is: 899220485</p>
                </div>
                <div className="max-w-4xl mx-auto mb-10">
                    <h2 className="mb-4 text-xl font-medium dark:text-gray-400">What you ordered:</h2>
                    <div
                        className="p-10 mb-8 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12">
                        <a href="#" className="mr-6 md:mr-12">
                            <Image className=" w-full lg:w-[80px] h-[200px] lg:h-[80px] object-cover  mx-auto mb-6 sm:mb-0 "
                                src="/images/food/orange.jpg " alt="orange" width={640} height={640} />
                        </a>
                        <div>
                            <a className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400" href="#">
                                Oranges</a>
                            <div className="flex flex-wrap">
                                <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Weight:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">2 lbs</span>
                                </p>
                                <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Price:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">$2.99</span>
                                </p>
                                {/* <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Store:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">San Jose OFS</span>
                                </p> */}
                                <p className="text-sm font-medium dark:text-gray-400">
                                    <span>Qty:</span>
                                    <span className="ml-2 text-gray-400">5</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="p-10 mb-8 bg-white rounded-md shadow  sm:flex sm:items-center xl:py-5 xl:px-12">
                        <a href="#" className="mr-6 md:mr-12">
                            <Image className=" w-full lg:w-[80px] h-[200px] lg:h-[80px] object-cover  mx-auto mb-6 sm:mb-0 "
                                src="/images/food/peach.jpg " alt="peach" width={640} height={640} />
                        </a>
                        <div>
                            <a className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400" href="#">
                                Peach</a>
                            <div className="flex flex-wrap">
                                <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Weight:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">3 lbs</span>
                                </p>
                                <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Price:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">$3.99</span>
                                </p>
                                {/* <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Store:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">San Jose OFS</span>
                                </p> */}
                                <p className="text-sm font-medium dark:text-gray-400">
                                    <span>Qty:</span>
                                    <span className="ml-2 text-gray-400">2</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12">
                        <a href="#" className="mr-6 md:mr-12">
                            <Image className=" w-full lg:w-[80px] h-[200px] lg:h-[80px] object-cover  mx-auto mb-6 sm:mb-0 "
                                src="/images/food/redApple.jpg " alt="apple" width={640} height={640} />
                        </a>
                        <div>
                            <a className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400" href="#">
                                Red Apples</a>
                            <div className="flex flex-wrap">
                                <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Weight:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">2 lbs</span>
                                </p>
                                <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Price:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">$3.69</span>
                                </p>
                                {/* <p className="mr-4 text-sm font-medium">
                                    <span className="font-medium dark:text-gray-400">Store:</span>
                                    <span className="ml-2 text-gray-400 dark:text-gray-400">San Jose OFS</span>
                                </p> */}
                                <p className="text-sm font-medium dark:text-gray-400">
                                    <span>Qty:</span>
                                    <span className="ml-2 text-gray-400">1</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto ">
                    <h2 className="mb-4 text-xl font-medium dark:text-gray-400 ">Order Details:</h2>
                    <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Subtotal</span>
                            <span className="flex items-center">
                                <span className="ml-3 mr-1 text-sm">$</span>
                                <span className="text-xl">26.62</span>
                            </span>
                        </div>
                        {/* <div
                            className="relative flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800">
                            <div
                                className="absolute right-0 flex items-center justify-center bg-blue-500 rounded-md w-14 h-14 dark:bg-gray-600">
                                <div
                                    className="flex items-center justify-center text-lg font-bold text-blue-500 bg-gray-100 rounded-full dark:text-gray-300 dark:bg-gray-700 w-11 h-11">
                                    8</div>
                            </div>
                            <span className="mr-16">Products</span>
                        </div> */}
                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Shipping</span>
                            <span className="flex items-center">
                                <span className="ml-3 mr-1 text-sm">$</span>
                                <span className="text-xl">10.00</span>
                            </span>
                        </div>

                        <div
                            className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md shadow dark:text-gray-400 dark:bg-gray-800 font-heading">
                            <span>Total</span>
                            <span className="flex items-center text-blue-500 dark:text-blue-400">
                                <span className="ml-3 mr-1 text-sm">$</span>
                                <span className="text-xl">36.62</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 ">
                        <Link href="/shop">
                            <button
                                className="btn btn-secondary w-full px-6 py-3 rounded-md md:w-auto text-gray-100 hover:text-gray-100 hover:bg-sky-300 dark:border-gray-800 dark:hover:bg-gray-800 dark:text-gray-300">
                                Go back shopping
                            </button>
                        </Link>
                        
                    </div>
                </div>

            </div>
        </section>
    )
}
