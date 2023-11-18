import MainSliderComponent from '@/components/MainSliderComponent';
import FeaturedProducts from '@/ui/home/FeaturedProducts';
import { ProductCategory, getFeaturedProducts } from "@/lib/products";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function Home() {
  let result: ProductCategory[] = await getFeaturedProducts();
  return (
    <main className="">
      <MainSliderComponent />
      <div className='feature-product m-8'>
        <h2 className="p-2 text-2xl font-bold text-center md:text-4xl ">
          Featured Products
        </h2>
        <div className="w-20 mx-auto mb-6 border-b border-red-700 dark:border-gray-400"></div>
        <div className="flex flex-wrap justify-center space-evenly">
          {result.map((item) => (
            <FeaturedProducts key={item.products.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  )
}
