'use client'

import { Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getImageUrl } from '../lib/utils';

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

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
  let imageLink = getImageUrl(product.picture);

  const maxLength = 35;
  const productDescription: string = product.description;
  const productName:string = product.name;

  const truncatedDescription: string = productDescription.length > maxLength
    ? productDescription.substring(0, maxLength) + "..." : productDescription;

  const truncatedName: string = productName.length > 28
  ? productName.substring(0, 28) + "..." : productName;

  return (
    <Link href={"/products/" + product.id} >
      <div className="card w-96 bg-base-100 shadow-xl m-4 ">
        <figure>
          <Image src={imageLink} alt={product.name}
            width={640} height={448} className="h-[250px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {truncatedName}
            {/* <div className="badge badge-secondary">NEW</div> */}
          </h2>
          <p>{product.brand}</p>
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