'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'
import { useEffect, useState } from 'react';

const ProductComponent = ({ product }: { product: Product }) => {
  const [category, setCategory] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/categoryByID?categoryID=" + product.categoryId, {
          method: 'GET',
        });
        setCategory(await response.json());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  },)
  if (!product) return null;
  let imageLink = "/" + product?.picture;

  const maxLength = 35;
  const productDescription: string = product.description;

  const truncatedDescription: string = productDescription.length > maxLength
    ? productDescription.substring(0, maxLength) + "..." : productDescription;

  return (
    <Link href={"/products/" + product.id+"?id="+product.id} >
      <div className="card w-96 bg-base-100 shadow-xl m-4 ">
        <figure>
          <Image src={imageLink} alt={product.name}
            width={640} height={448} className="h-[250px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.brand} {product.name}
            {/* <div className="badge badge-secondary">NEW</div> */}
          </h2>
          <p>{truncatedDescription}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{category}</div>
          </div>
        </div>
      </div>
    </Link>




  );
};

export default ProductComponent;