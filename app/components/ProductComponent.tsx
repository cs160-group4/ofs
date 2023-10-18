import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/products'

export default async function ProductComponent({ product }: { product: Product }) {
  if (!product) return null;
  let imageLink = '/images/food/' + product?.picture;

  const maxLength = 35;
  const productDescription: string = product.description;

  const truncatedDescription: string = productDescription.length > maxLength
    ? productDescription.substring(0, maxLength) + "..." : productDescription;

  return (
    <Link href={"/products/" + product.id} >
      <div className="card w-96 bg-base-100 shadow-xl m-4 ">
        <figure>
          <Image src={imageLink} alt={product.name}
            width={640} height={448} className="h-[250px]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {product.name}
            {/* <div className="badge badge-secondary">NEW</div> */}
          </h2>
          <p>{truncatedDescription}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{product.category}</div>
          </div>
        </div>
      </div>
    </Link>




  );
};
