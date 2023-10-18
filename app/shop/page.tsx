import Image from 'next/image'
import Link from 'next/link'
import Categories from '@/components/ProductCategoryComponent'
import ProductComponent from '@/components/ProductComponent'
import { getProductByCategory, getProducts } from "@/lib/products";
import { Product } from '@/lib/products'

export default async function ShopPage({ params }: { params: { slug: string } }) {
  let products = await getProducts();
  return (
    <>
      <div className="flex flex-wrap justify-center space-evenly">
        {products.map((product) => (
          <ProductComponent key={product.id} product={product} />
        ))}
      </div>


    </>
  )

}