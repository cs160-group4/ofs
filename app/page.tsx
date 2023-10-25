import MainSliderComponent from '@/components/MainSliderComponent';
import ProductComponent from '@/components/ProductComponent';
import { getFeaturedProducts } from "@/lib/products";
export default async function Home() {
  let products = await getFeaturedProducts();
  return (
    <main className="">
      {/* Main slider component */}
      <MainSliderComponent />
      <div className='feature-product m-8'>
        <h2 className="p-2 text-2xl font-bold text-center md:text-4xl ">
          Featured Products
        </h2>
        <div className="w-20 mx-auto mb-6 border-b border-red-700 dark:border-gray-400"></div>
        <div className="flex flex-wrap justify-center space-evenly">
          {products.map((product) => (
            <ProductComponent key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
