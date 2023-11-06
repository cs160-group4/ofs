import Image from 'next/image'
import { getProducts, getProductById } from "@/lib/products";
import { redirect } from 'next/navigation';


export default async function products() {
    redirect("/shop/all");
}

