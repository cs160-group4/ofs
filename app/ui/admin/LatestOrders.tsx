import { ArrowPathIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { getLatestOrders } from '@/lib/orders';
import clsx from 'clsx';
import Image from 'next/image';
import { getAvatarURL } from '@/lib/utils';
export default async function LatestOrders() {
    const result = await getLatestOrders(5);
    return (
        <div className="flex w-full flex-col md:col-span-4 lg:col-span-4">
            <h2 className='mb-4 text-xl md:text-2xl'>
                Latest Orders
            </h2>
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4 ">
                <div className="bg-white px-6 shadow hover:shadow-xl">
                    {result.map((item, i) => {
                        return (
                            <div
                                key={item.orders.id}
                                className={clsx(
                                    'flex flex-row items-center justify-between py-4',
                                    {
                                        'border-t': i !== 0,
                                    },
                                )}
                            >
                                <div className="flex items-center">
                                    <Image
                                        src={getAvatarURL(item.user?.image)}
                                        alt={`${item.user?.name}'s profile picture`}
                                        className="mr-4 rounded-full"
                                        width={32}
                                        height={32}
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold md:text-base">
                                            {item.user?.name}
                                        </p>
                                        <p className="hidden text-sm text-gray-500 sm:block">
                                            {item.user?.email}
                                        </p>
                                    </div>
                                </div>
                                <p
                                    className='truncate text-sm font-medium md:text-base'
                                >
                                    ${item.orders.grandTotal}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center pb-2 pt-2">
                    <ArrowPathIcon className="h-5 w-5 text-gray-500 hover:animate-spin" />
                    <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                </div>
            </div>
        </div>
    );

}

