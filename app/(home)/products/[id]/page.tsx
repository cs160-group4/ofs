import { getAuthSession } from '@/app/api/auth/[...nextauth]/options'
import { getImageUrl } from '@/app/lib/utils'
import Comments from '@/app/ui/comments/Comments'
import WriteComment from '@/app/ui/comments/WriteComment'
import AddToCartForm from '@/app/ui/products/AddToCartForm'
import ProductDoesNotExist from '@/app/ui/products/ProductDoesNotExist'
import Ratings from '@/app/ui/ratings/Ratings'
import { getCategoryById } from '@/lib/categories'
import { getCommentsByProductId } from '@/lib/comments'
import { getProductById } from '@/lib/products'
import { getProductRatingByUserId, getRatingsByProductId } from '@/lib/ratings'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProductDetails({ params }: { params: { id: string } }) {
    let prod_id: number = parseInt(params.id);
    if (isNaN(prod_id)) {
        return <ProductDoesNotExist />
    }
    var signedIn = false;
    var user_id = "";
    const session = await getAuthSession();

    if (session?.user) {
        signedIn = true;
        user_id = session.user.id as string;
    }

    var product = await getProductById(prod_id);

    if (product == null) {
        return <ProductDoesNotExist />
    }
    let productPicture = getImageUrl(product.picture);
    var category = await getCategoryById(product.categoryId);
    let comments = await getCommentsByProductId(prod_id);
    let ratings = await getRatingsByProductId(prod_id);
    let myRating = await getProductRatingByUserId(user_id, prod_id);
    return <>
        <main>
            <section className="py-10 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                            <div className="flex sticky top-0 overflow-hidden items-center justify-center">
                                <div className="relative mb-6 lg:mb-10 lg:h-96">
                                    <Image src={productPicture} alt={product.name} width={448} height={704}  className='object-fill'/>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6 ">
                                    <div className="mb-4 lg:mb-0">
                                        <span className="p-2 text-xs text-white bg-primary  rounded-xl ">
                                            <Link href={`/shop/${category}`} >
                                                {category}
                                            </Link>
                                        </span>
                                        <div className="flex items-center mt-2">
                                            <h2 className="max-w-xl text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                                {product.brand} {product.name}
                                            </h2>
                                            {signedIn ?
                                                <button className="flex items-center justify-center w-10 h-10 p-2 ml-4 text-gray-700 border border-gray-300 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                                                    </svg>
                                                </button>
                                                : null}
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center mb-6">
                                        <ul className="flex mb-4 mr-2 lg:mb-0">
                                            <li>
                                                <a href="#">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="w-4 mr-1 text-primary dark:text-blue-400 bi bi-star-fill"
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
                                                        className="w-4 mr-1 text-primary dark:text-blue-400 bi bi-star-fill"
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
                                                        className="w-4 mr-1 text-primary dark:text-blue-400 bi bi-star-fill"
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
                                                        className="w-4 mr-1 text-primary dark:text-blue-400 bi bi-star-fill"
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
                                                        className="w-4 mr-1 text-primary dark:text-blue-400 bi bi-star-half"
                                                        viewBox="0 0 16 16">
                                                        <path
                                                            d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </li>


                                        </ul>
                                        <a className="mb-4 text-xs underline hover:text-primary dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#customer-ratings">
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
                                    {(product.itemQuantity == 0) ?
                                        <span className="text-base text-gray-600 dark:text-gray-400">Out of Stock</span>
                                        :
                                        <span className="text-base text-gray-600 dark:text-gray-400">In Stock</span>
                                    }
                                    <p className="mt-2 text-sm text-blue-500 dark:text-blue-200">
                                        <span className="text-gray-600 dark:text-gray-400">

                                        </span>
                                    </p>
                                </div>

                                <div className="flex flex-wrap items-center mb-6">
                                    {signedIn ?
                                        <AddToCartForm product={product} />
                                        :
                                        <Link href="/auth/signin">
                                            <button className="btn btn-primary btn-block text-white" >
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
            <section className="py-6 lg:py-10 bg-gray-100 ">
                <div className="max-w-6xl px-4 py-6 mx-auto lg:py-4 md:px-6 ">
                    {/* Ratings */}
                    <Ratings productId={prod_id} ratings={ratings} myRating={myRating} signedIn={signedIn} />
                    {/* Comments Section */}
                    <Comments comments={comments} />
                    {/* Write a comment */}
                    <WriteComment productId={prod_id} signedIn={signedIn} />
                </div>
            </section>
        </main >
    </>

}


