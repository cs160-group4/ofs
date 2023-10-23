import MainSliderComponent from '@/components/MainSliderComponent'
import Image from 'next/image'
import Link from 'next/link'
import { getProductsLimit } from "@/lib/products";
import ProductComponent from '@/components/ProductComponent'
export default async function Home() {
  let products = await getProductsLimit(3);
  return (
    <main className="">
      {/* Main slider component */}
      <MainSliderComponent />
      {/* A grid of 3 cards centered on the page */}
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
      {/* <div className="flex justify-evenly lg:flex-row flex-col items-center">
        <Link href="/product/1">
          <div className="card w-96 bg-base-100 shadow-xl m-4">
            <figure>
              <Image src="/images/food/food1.jpg" alt="vegetable dish" width={640} height={448} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Vegan Curry!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>rice with green leaf vegetable on white ceramic plate</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Vegetables</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/product/2">
          <div className="card w-96 bg-base-100 shadow-xl m-4">
            <figure>
              <Image src="/images/food/food2.jpg" alt="vegetable dish" width={640} height={448} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Tasty salad!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>
                stainless steel fork and knife on white ceramic plate</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Nutrition</div>
                <div className="badge badge-outline">Salad</div>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/product/3">
          <div className="card w-96 bg-base-100 shadow-xl m-4">
            <figure>
              <Image src="/images/food/food3.jpg" alt="vegetable dish" width={640} height={448} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                Fresh salad with vegetables!
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>
                vegetable dish on gray bowl</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Nutrition</div>
                <div className="badge badge-outline">Salad</div>
              </div>
            </div>
          </div>
        </Link>
      </div> */}

    </main>
  )
}
