import { Product, ProductCategory } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function FeaturedProducts({ item }: { item: ProductCategory }) {
  let product: Product = item.products;
  let category = item.product_categories;
  if (!product) return null;
  let imageLink = "/" + product?.picture;
  const maxLength = 35;
  const productDescription: string = product.description;
  const truncatedDescription: string = productDescription.length > maxLength
    ? productDescription.substring(0, maxLength) + "..." : productDescription;
  return (
    <Link href={"/products/" + product.id} >
      <div className="card w-96 bg-base-100 shadow hover:shadow-xl m-4 hover:animate-pulse transform hover:scale-103">
        <figure>
          <Image src={imageLink} alt={product.name}
            width={640} height={448} className="h-[250px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.brand} {product.name}
          </h2>
          <p>{truncatedDescription}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{category.name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};