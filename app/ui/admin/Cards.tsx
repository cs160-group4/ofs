import { getAdminCardData } from '@/lib/admin';
import {
  BanknotesIcon,
  ClockIcon,
  InboxIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function Cards() {
  const {
    totalRevenue,
    orderCount,
    productCount,
    customerCount,
  } = await getAdminCardData();

  return (
    <>
      <Card title="Collected" value={totalRevenue} type="revenue" />
      <Card title="Total Orders" value={orderCount} type="orderCount" />
      <Card title="Total Products" value={productCount} type="productCount" />
      <Card title="Total Customers" value={customerCount} type="customers"
      />
    </>
  );
}


const iconMap = {
  revenue: BanknotesIcon,
  productCount: ClockIcon,
  orderCount: InboxIcon,
  customers: UserGroupIcon,
};

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'revenue' | 'productCount' | 'orderCount' | 'customers';
}) {
  const Icon = iconMap[type];
  return (
    <div className="rounded-xl shadow hover:shadow-lg  bg-gray-50 p-2 ">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className='truncate rounded-xl bg-white px-4 py-8 text-center text-2xl'
      >
        {value}
      </p>
    </div>
  );
}
