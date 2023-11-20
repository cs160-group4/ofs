'use client'
import { productRatingAction } from '@/actions/ratings';
import { Rating } from '@/lib/ratings';
import StarRating from '@/ui/ratings/StarRating';
import { useState } from 'react';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function RatingsSmall({ productId, ratings, myRating, signedIn }: { productId: number, ratings: Rating[], myRating: number, signedIn: boolean }) {
    const [rating, setRating] = useState(myRating);
    let ratingCount = ratings.length;
    let averageRating = 0;
    ratings.forEach(rating => {
        averageRating += rating.ratingValue as number;
    });
    averageRating = averageRating / ratingCount;
    let avg = Number(averageRating).toFixed(1);;
    return (
        <>
            <StarRating count={5} value={averageRating} size={16} />
        </>
    )
}