import Image from 'next/image'
import { getProducts, getProductById } from "@/lib/products";
import { redirect } from 'next/navigation';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function products() {
    redirect("/shop/all");
}

