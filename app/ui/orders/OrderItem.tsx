import Link from 'next/link'
import Image from 'next/image'
import { OrderItem, OrderItemWithProduct } from '@/app/lib/order_item';
import { getImageUrl } from '@/app/lib/utils';
export default async function OrderItem({ orderItem }: { orderItem: OrderItemWithProduct }) {
    const product = orderItem.products;
    const order_item = orderItem.order_item;
    const picture = getImageUrl(product.picture);
    return (
        <>
            <div
                className="p-10 mb-8 bg-white rounded-md shadow dark:bg-gray-800 sm:flex sm:items-center xl:py-5 xl:px-12">
                <a href="#" className="mr-6 md:mr-12">
                    <Image className=" w-full lg:w-[80px] h-[200px] lg:h-[80px] object-cover  mx-auto mb-6 sm:mb-0 "
                        src={picture} alt="orange" width={640} height={640} />
                </a>
                <div>
                    <a className="inline-block mb-1 text-lg font-medium hover:underline dark:text-gray-400" href="#">
                        {product.name}</a>
                    <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-medium">
                            <span className="font-medium dark:text-gray-400">Weight:</span>
                            <span className="ml-2 text-gray-400 dark:text-gray-400">{product.itemWeight} lbs</span>
                        </p>
                        <p className="mr-4 text-sm font-medium">
                            <span className="font-medium dark:text-gray-400">Price:</span>
                            <span className="ml-2 text-gray-400 dark:text-gray-400">${order_item.price}</span>
                        </p>
                        <p className="text-sm font-medium dark:text-gray-400">
                            <span>Qty:</span>
                            <span className="ml-2 text-gray-400">{order_item.quantity}</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}



