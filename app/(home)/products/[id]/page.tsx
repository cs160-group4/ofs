import Image from 'next/image'
import Link from 'next/link'
import { getCategoryById } from '@/lib/categories'
import { getProductById } from '@/lib/products'
import CommentsComponent from '@/app/ui/products/CommentsComponent'
import { getCommentsByProductId } from '@/lib/comments'
import { getProductAverageRating } from '@/lib/ratings'
import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import { NewCart, addProductToCart, getProdInCart, updateSpecificProductInCart } from '@/app/lib/cart'
import { user } from 'drizzle/schema'
import ShopCategoryQuantityComponent from '@/app/components/ShopCategoryQuantityComponent'
import { redirect } from 'next/dist/server/api-utils'

export default async function ShopCategory({ searchParams }: { searchParams: { id: string; quantity?:number } }) {

    var signedIn = false;
    var user_id = "";
    var currentQuantity = Number(searchParams?.quantity) || 1;
    const session = await getAuthSession();

    if (session?.user) {
        signedIn = true;
        user_id = session.user.id as string;
    }

    var prod_id: number = parseInt(searchParams.id)
    var product = await getProductById(prod_id);
    
    if (product == null) {
        return <main className="flex items-center justify-center h-screen">
                    <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                        <div className="flex flex-col items-center">
                            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                                <span className="text-black">Sorry! The Product You Searched <br></br>For Does Not Exist</span> 
                            </h6>
                            <Link href="/shop/all" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                                Go back
                            </Link>
                        </div>
                    </div>
                </main>
    }

    const addCartItem = async () => {
        'use server'

        try {
            const response : any = await getProdInCart(user_id, prod_id);
            if (response.length > 0) {
                currentQuantity += response[0].quantity
                let data : NewCart = {
                    userId : user_id,
                    productId : prod_id,
                    quantity : currentQuantity
                }  
                await updateSpecificProductInCart(response[0].id, data);
            }
            else {
                let data : NewCart = {
                    userId : user_id,
                    productId : prod_id,
                    quantity : currentQuantity
                }  
                await addProductToCart(data);
            }
        } catch (error) {
          console.log(error);
        }
    }

    var category = await getCategoryById(product.categoryId);
    let comments = await getCommentsByProductId(prod_id);
    let averageRating = await getProductAverageRating(prod_id);

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
                                    <Image src={'/' + product?.picture} alt={product.name} width={500} height={500} />
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
                                    <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">{category}</span>
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
                                    { (product.itemQuantity==0) ?
                                        <span className="text-base text-gray-600 dark:text-gray-400">Out of Stock</span>
                                        :
                                        <span className="text-base text-gray-600 dark:text-gray-400">In Stock</span>
                                    }
                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                                        <span className="text-gray-600 dark:text-gray-400">

                                        </span>
                                    </p>
                                </div>
                                <div className="mb-6 "></div>
                                <div className="flex flex-wrap items-center mb-6">
                                    <div className="mb-4 mr-4 lg:mb-0">
                                        <div className="w-fit">
                                            <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                                <ShopCategoryQuantityComponent quantity={product.itemQuantity}/>
                                            </div>
                                        </div>
                                    </div>
                                    {signedIn ?
                                        <form action={addCartItem}>
                                            <button className="btn btn-accent text-gray-100"> Add to cart</button>
                                        </form>
                                        :
                                        <Link href="/auth/signin">
                                            <button className="btn btn-primary btn-block">
                                                Log In
                                            </button>
                                        </Link>
                                    }
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
                            </div>

                        </div>
                    </div>
                    {/* Comments Section */}
                    <div className="mt-10">
                        <h2
                            className="px-2 pb-2 mb-8 text-lg font-semibold border-b border-gray-300 dark:text-gray-300 dark:border-gray-700">
                            Comments</h2>
                        <div className="max-w-5xl px-2">
                            {comments.map((comment) => (
                                <CommentsComponent key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>
                    {/* Review Section */}
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


