import { getProductById } from '@/lib/products'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

export default async function ShopCategory({ params }: { params: { id: string } }) {
    var id: number = parseInt(params.id)
    var product = await getProductById(id);
    if (product == null) {
        return <div>Product not found</div>
    }
    let imageLink = '/images/food/' + product?.picture;
    return <main>
        <>
            <section className="py-10 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                            <div className="sticky top-0 overflow-hidden ">
                                <div className="relative mb-6 lg:mb-10 lg:h-96">
                                    <a className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z">
                                            </path>
                                        </svg>
                                    </a>
                                    {/* <Image className="object-contain w-full lg:h-full" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="">
                                    <a className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                    </a>
                                </Image> */}
                                    <Image src={imageLink} alt={product.name} width={500} height={500} />
                                </div>
                                <div className="flex-wrap hidden -mx-2 md:flex">
                                    <div className="w-1/2 p-2 sm:w-1/4">
                                        <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            {/* <Image className="object-contain w-full lg:h-28" src="https://i.postimg.cc/Z5KhRkD6/download-1-removebg-preview.png" alt=""></Image> */}
                                        </a>
                                    </div>
                                    <div className="w-1/2 p-2 sm:w-1/4">
                                        <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            {/* <Image className="object-contain w-full lg:h-28" src="https://i.postimg.cc/8kJBrw03/download-removebg-preview.png" alt=""></Image> */}
                                        </a>
                                    </div>
                                    <div className="w-1/2 p-2 sm:w-1/4">
                                        <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            {/* <Image className="object-contain w-full lg:h-28" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="" /> */}
                                        </a>
                                    </div>
                                    <div className="w-1/2 p-2 sm:w-1/4">
                                        <a className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300" href="#">
                                            {/* <Image className="object-contain w-full lg:h-28" src="https://i.postimg.cc/0N4Kk1PN/black-microprocessors-removebg-preview.png" alt="" /> */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6 ">
                                    <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">{product.category}</span>
                                    <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                        {product.brand} {product.name}
                                    </h2>
                                    <div className="flex flex-wrap items-center mb-6">
                                        <ul className="flex mb-4 mr-2 lg:mb-0">
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-half"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>


                                        </ul>
                                        <a className="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#">
                                            reviews (2)
                                        </a>
                                    </div>
                                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                                        <span>${product.itemPrice}</span>
                                        {/* <span className="ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400">$20</span> */}
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Information</h2>
                                    <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                                        <div className="p-3 lg:p-5 ">
                                            <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                                                <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                                    <div className="w-full mb-4 md:w-2/5">
                                                        <div className="flex ">
                                                            <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-diagram-3 w-7 h-7" viewBox="0 0 16 16">
                                                                <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"></path>
                                                            </svg> */}
                                                            </span>
                                                            <div>
                                                                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                    Weight
                                                                </p>
                                                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                    {product.itemWeight} lbs
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full mb-4 md:w-2/5">
                                                        <div className="flex ">
                                                            <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gpu-card w-7 h-7" viewBox="0 0 16 16">
                                                                <path d="M4 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm7.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"></path>
                                                                <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .5.5V4h13.5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5H2v2.5a.5.5 0 0 1-1 0V2H.5a.5.5 0 0 1-.5-.5Zm5.5 4a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM9 8a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"></path>
                                                                <path d="M3 12.5h3.5v1a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-1Zm4 1v-1h4v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5Z"></path>
                                                            </svg> */}
                                                            </span>
                                                            <div>
                                                                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                    Quanity
                                                                </p>
                                                                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                    {product.itemQuantity}
                                                                </h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                                    <div className="flex ">
                                                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                           
                                                        </span>
                                                        <div>
                                                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                Fiber
                                                            </p>
                                                            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                20%
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                    {/* <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                                    <div className="flex ">
                                                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                                                        </span>
                                                        <div>
                                                            <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                Prep Time
                                                            </p>
                                                            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                                                30 minutes
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-6 mb-6 border-t  border-gray-200 dark:border-gray-700">
                                    <span className="text-base text-gray-600 dark:text-gray-400">Description</span>
                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {product.description}
                                        </span>
                                    </p>
                                </div>
                                <div className="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                                    <span className="text-base text-gray-600 dark:text-gray-400">In Stock</span>
                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                                        <span className="text-gray-600 dark:text-gray-400">

                                        </span>
                                    </p>
                                </div>
                                <div className="mb-6 "></div>
                                <div className="flex flex-wrap items-center mb-6">
                                    <div className="mb-4 mr-4 lg:mb-0">
                                        <div className="w-28">
                                            <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                                <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300">
                                                    <span className="m-auto text-2xl font-thin">-</span>
                                                </button>
                                                <input type="number" className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black" placeholder="1" />
                                                <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300">
                                                    <span className="m-auto text-2xl font-thin">+</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 lg:mb-0">
                                        <button className="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className=" bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                                                </path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Link href="/cart" >
                                        <button className="btn btn-accent text-gray-100"> Add to cart</button>
                                    </Link>
                                </div>
                                <div className="flex gap-4 mb-6">
                                    <Link href="/checkout" className='w-full'>
                                        <button className="w-full btn btn-primary text-gray-100">Buy now</button>  </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
            <section className="py-10 lg:py-16 bg-gray-100 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6">
                    {/* Ratings */}
                    <div >
                        <h2
                            className="px-2 pb-2 mb-8 text-lg font-semibold border-b border-gray-300 dark:text-gray-300 dark:border-gray-700">
                            Customer Ratings</h2>
                        <div className="max-w-5xl px-4">
                            <div className="flex flex-col items-center justify-between mb-6">
                                <div className='w-96 items-center justify-center'>
                                    <div className="p-6 bg-white rounded-md dark:bg-gray-900">
                                        <h2 className="mb-6 text-3xl font-black text-center dark:text-gray-400">Customer Reviews</h2>
                                        <div className="mb-4 text-center">
                                            <span className="inline-block text-5xl font-bold text-blue-500 dark:text-gray-300">4.5</span>
                                            <span className="inline-block text-xl font-medium text-gray-700 dark:text-gray-400">
                                                /5</span>
                                        </div>
                                        <ul className="flex items-center justify-center mb-6">
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                        <p className="mb-6 text-sm text-center dark:text-gray-400">Average Rating and percentage per views
                                        </p>
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                    <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                                    //  style="width: 75%"
                                                    >
                                                    </div>
                                                </div>
                                                <div className="text-base font-medium dark:text-gray-400">91% </div>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                    <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                                    // style="width: 45%"
                                                    >
                                                    </div>
                                                </div>
                                                <div className="text-base font-medium d dark:text-gray-400">45% </div>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                    <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                                    // style="width: 25%"
                                                    >
                                                    </div>
                                                </div>
                                                <div className="text-base font-medium dark:text-gray-400">25% </div>
                                            </div>
                                            <div className="flex items-center ">
                                                <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                                    <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                                    // style="width: 14%"
                                                    >
                                                    </div>
                                                </div>
                                                <div className="text-base font-medium dark:text-gray-400">14% </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>















                                {/* <div>
                                    <span className="inline-block text-5xl font-bold text-blue-700 dark:text-gray-300">4.5</span>
                                    <span className="inline-block text-xl font-medium text-gray-700 dark:text-gray-400">
                                        /5</span>
                                    <ul className="flex items-center mt-4 mb-4">
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor"
                                                    className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                    </path>
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                    <p className="text-sm dark:text-gray-400">Average Rating and percentage per views
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                            // style=""
                                            ></div>
                                        </div>
                                        <div className="flex justify-end text-base font-medium dark:text-gray-400">91% </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                            // style="width: 45%"
                                            ></div>
                                        </div>
                                        <div className="flex justify-end text-base font-medium dark:text-gray-400">45% </div>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                            // style="width: 25%"
                                            ></div>
                                        </div>
                                        <div className="flex justify-end text-base font-medium dark:text-gray-400">25% </div>
                                    </div>
                                    <div className="flex items-center mb-2 ">
                                        <div className="w-full h-4 mr-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                            <div className="h-4 bg-blue-500 rounded-full dark:bg-blue-400"
                                            // style="width: 14%"
                                            ></div>
                                        </div>
                                        <div className="flex justify-end text-base font-medium dark:text-gray-400">14% </div>
                                    </div>
                                </div> */}
                            </div>

                        </div>
                    </div>
                    {/* Comments */}
                    <div className="mt-10">
                        <h2
                            className="px-2 pb-2 mb-8 text-lg font-semibold border-b border-gray-300 dark:text-gray-300 dark:border-gray-700">
                            Comments</h2>
                        <div className="max-w-5xl px-2">
                            <div
                                className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 lg:p-6 dark:bg-gray-700 dark:border-gray-700">
                                <div className="md:block lg:flex">
                                    {/* <img className="object-cover w-16 h-16 mr-4 rounded-full shadow"
                                        src="https://i.postimg.cc/rF6G0Dh9/pexels-emmy-e-2381069.jpg" alt="avatar" /> */}
                                    <div>
                                        <div className="flex flex-wrap items-center justify-between mb-1">
                                            <div className="mb-2 md:mb-0">
                                                <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-400">
                                                    Marry Doe
                                                </h2>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Joined 12 SEP 2012. </p>
                                            </div>
                                            <div>
                                                <ul className="flex items-center pb-1 mb-2">
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-half"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="flex items-center">
                                                    <div className="flex mr-3 text-sm text-gray-700 dark:text-gray-400">
                                                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                            height="16" fill="currentColor"
                                                            className="w-4 h-4 mr-1 text-blue-400 bi bi-hand-thumbs-up-fill"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z">
                                                            </path>
                                                        </svg></a>
                                                        <span>12</span>
                                                    </div>
                                                    <div className="flex text-sm text-gray-700 dark:text-gray-400">
                                                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                            height="16" fill="currentColor"
                                                            className="w-4 h-4 mr-1 text-blue-400 bi bi-chat"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z">
                                                            </path>
                                                        </svg></a>
                                                        <span>8</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
                                            I am very happy with this product. It is very good
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 lg:p-6 dark:bg-gray-700 dark:border-gray-700">
                                <div className=" md:block lg:flex">
                                    {/* <img className="object-cover w-16 h-16 mr-4 rounded-full shadow"
                                        src="https://i.postimg.cc/m2c3hQNk/pexels-andrea-piacquadio-3760373.jpg" alt="avatar" /> */}
                                    <div>
                                        <div className="flex flex-wrap items-center justify-between mb-1">
                                            <div className="mb-2 md:mb-0">
                                                <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-400">
                                                    John William
                                                </h2>
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Joined 12 SEP 2012. </p>
                                            </div>
                                            <div>
                                                <ul className="flex items-center pb-1 mb-2">
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-fill"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                fill="currentColor"
                                                                className="w-4 mr-1 text-blue-500 dark:text-blue-400 bi bi-star-half"
                                                                viewBox="0 0 16 16">
                                                                <path
                                                                    d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z">
                                                                </path>
                                                            </svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="flex items-center">
                                                    <div className="flex mr-3 text-sm text-gray-700 dark:text-gray-400">
                                                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                            height="16" fill="currentColor"
                                                            className="w-4 h-4 mr-1 text-blue-400 bi bi-hand-thumbs-up-fill"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z">
                                                            </path>
                                                        </svg></a>
                                                        <span>12</span>
                                                    </div>
                                                    <div className="flex text-sm text-gray-700 dark:text-gray-400">
                                                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                            height="16" fill="currentColor"
                                                            className="w-4 h-4 mr-1 text-blue-400 bi bi-chat"
                                                            viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z">
                                                            </path>
                                                        </svg></a>
                                                        <span>8</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
                                            This product is good. I like it.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-md dark:bg-gray-900">
                        <h2 className="mb-6 text-2xl font-black text-left dark:text-gray-400">
                            Write a Review</h2>
                        <form action="" className="">
                            <div className="flex flex-wrap ">
                                <div className="w-full px-2 mb-6 md:w-1/2">
                                    <label
                                        // for="firstname"
                                        className="block mb-2 font-bold text-gray-700 uppercase dark:text-gray-400">
                                        First Name
                                    </label>
                                    <input type="text" placeholder="first name"
                                        //  required=""
                                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded lg:mb-0 dark:placeholder-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ">
                                    </input>
                                </div>
                                <div className="w-full px-2 mb-6 md:w-1/2">
                                    <label
                                        //  for="firstname"
                                        className="block mb-2 font-bold text-gray-700 uppercase dark:text-gray-400">
                                        Last Name</label>
                                    <input type="text" placeholder="last name"
                                        //  required=""
                                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 lg:mb-0 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ">
                                    </input>
                                </div>
                            </div>
                            <div className="px-2 mb-6">
                                <label
                                    //  for="firstname"
                                    className="block mb-2 font-bold text-gray-700 uppercase dark:text-gray-400">
                                    Email</label>
                                <input type="text" placeholder="abc@gmail.com"
                                    // required=""
                                    className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-100 border rounded dark:placeholder-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 ">
                                </input>
                            </div>
                            <div className="px-2 mb-6">
                                <label
                                    // for="firstname"
                                    className="block mb-2 font-bold text-gray-700 uppercase dark:text-gray-400">
                                    Review</label>
                                <textarea 
                                // type="message" 
                                placeholder="write a review"
                                    // required=""
                                    className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 rounded dark:placeholder-gray-500 py-7 dark:text-gray-400 dark:border-gray-800 dark:bg-gray-800 "></textarea>
                            </div>
                            <div className="px-2">
                                <button
                                    className="px-4 py-2 font-medium text-gray-100 bg-blue-500 rounded shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-700">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    </main>







}


