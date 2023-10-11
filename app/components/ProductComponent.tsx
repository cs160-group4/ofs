import {FC} from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface pageProps {
  productData : any
}

const ProductComponent :  FC<pageProps> = ({productData}) => {
    
  let imageLink = '/images/food/'+productData.productPictureLink;

  return (
    <Link href={`/product?productID=${productData.productID}`}>
      <div className="max-w-xs min-w-max max-h-64 w-60 p-4 m-2 outline-black outline">
          <Image 
            src={imageLink} 
            alt={productData.productName} 
            width={150} height={150}
            className='w-auto h-auto'
          />
          <div className="text-black">{productData.productBrand} {productData.productName}</div>
          <div className="text-black">Category: {productData.productCategory}</div>
          <div className="text-black">Weight: {productData.itemWeight}</div>
          <div className="text-black">Price: ${productData.itemPrice}</div>
      </div>
    </Link>
  );
};


export default  ProductComponent;
