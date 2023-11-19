'use client'
import { productRatingAction } from '@/actions/ratings';
import { SignInButton } from '@/app/components/SignInButton';
import { Rating } from '@/lib/ratings';
import StarRating from '@/ui/ratings/StarRating';
import { useState } from 'react';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function Ratings({ productId, ratings, myRating, signedIn }: { productId: number, ratings: Rating[], myRating: number, signedIn: boolean }) {
    const [rating, setRating] = useState(myRating);
    let ratingCount = ratings.length;
    let averageRating = 0;
    let fiveStar = 0;
    let fourStar = 0;
    let threeStar = 0;
    let twoStar = 0;
    let oneStar = 0;
    ratings.forEach(rating => {
        averageRating += rating.ratingValue as number;
        if (rating.ratingValue === 5) {
            fiveStar++;
        } else if (rating.ratingValue === 4) {
            fourStar++;
        } else if (rating.ratingValue === 3) {
            threeStar++;
        } else if (rating.ratingValue === 2) {
            twoStar++;
        } else if (rating.ratingValue === 1) {
            oneStar++;
        }
    });
    averageRating = averageRating / ratingCount;
    let avg = Number(averageRating).toFixed(1);;
    const handleRating = (value: number) => {
        setRating(value);
        productRatingAction.call(null, productId, value);
    }
    return (
        <>
            <div id="customer-ratings">
                <div className="max-w-5xl px-4">
                    <div className="flex flex-col items-center justify-between mb-6">
                        <div className='w-full items-center justify-center'>
                            <div className="flex mb-4 w-full bg-white rounded-md">
                                <div className="w-1/2 border-r border-gray-200">
                                    <div className="p-6 bg-white rounded-md dark:bg-gray-900">
                                        <h2 className="mb-4 text-2xl font-black text-center text-gray-700">Customer Ratings</h2>
                                        {ratingCount > 0 ? (
                                            <>
                                                <div className="mb-4 text-center">
                                                    <span className="inline-block text-5xl font-bold text-primary">{avg}</span>
                                                    <span className="inline-block text-xl font-medium text-gray-700 dark:text-gray-400">
                                                        /5</span>
                                                </div>
                                                <div className="flex items-center justify-center mb-4 space-x-1">
                                                    <StarRating count={5} value={averageRating} size={25} />
                                                </div>
                                                <p className="mb-6 text-sm text-center dark:text-gray-400">Average Rating and percentage per views
                                                </p>
                                                <div className="flex flex-col ms-6 justify-between mb-4">
                                                    <div className="flex items-center mb-2">
                                                        <StarRating count={5} value={5} size={25} />
                                                        <div className="text-start ms-2 text-lg">{fiveStar}</div>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <StarRating count={5} value={4} size={25} />
                                                        <div className="text-start ms-2 text-lg">{fourStar}</div>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        <StarRating count={5} value={3} size={25} />
                                                        <div className="text-start ms-2 text-lg">{threeStar}</div>
                                                    </div>
                                                    <div className="flex items-center ">
                                                        <StarRating count={5} value={2} size={25} />
                                                        <div className="text-start ms-2 text-lg">{twoStar}</div>
                                                    </div>
                                                    <div className="flex items-center ">
                                                        <StarRating count={5} value={1} size={25} />
                                                        <div className="text-start ms-2 text-lg">{oneStar}</div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center mb-4 space-x-1">
                                                <span className="inline-block text-xl font-medium text-gray-700 dark:text-gray-400">
                                                    No Ratings</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="flex flex-col h-full justify-center items-center ">
                                        <h2 className="mt-6 mb-6 text-2xl font-black text-center dark:text-gray-400">Rate this product</h2>
                                        {signedIn ? (<>  <div>
                                            <div className="flex items-center justify-center mb-6">
                                                <StarRating
                                                    count={5}
                                                    size={50}
                                                    value={rating}
                                                    edit={true}
                                                    onChange={(value) => handleRating(value)} />
                                            </div>
                                        </div>  </>) : (
                                            <div className="flex items-center justify-center mb-6" >
                                                <SignInButton />
                                            </div>)
                                        }
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}