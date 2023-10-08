import {FC} from 'react'
import Link from 'next/link'

interface pageProps {
  name: string;
  price: number;
  weight: number;
  description: string;
  quantity: number;
}

const ProductComponent :  FC<pageProps> = ({name, price, weight, description, quantity}) => {
    
  return (
    <Link href={`/product?name=${name}`}>
      <div className="max-w-xs min-w-max w-60 p-4 m-2 outline-black outline">
          <div className="text-black">{name}</div>
          <div className="text-black">{price}</div>
          <div className="text-black">{weight}</div>
          <div className="text-black">{description}</div>
          <div className="text-black">{quantity}</div>
      </div>
    </Link>
  );
};


export default  ProductComponent;
