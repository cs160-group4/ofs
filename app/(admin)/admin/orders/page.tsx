import { SearchQueryProps } from '@/app/lib/utils';
import StatusListener from '@/app/ui/common/StatusListener';
import { getOrdersPages } from '@/lib/orders';
import OrdersTable from '@/ui/admin/orders/Table';
import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Orders | OFS Admin Dashboard',
};

export default async function OrdersPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getOrdersPages(query);

  return (
    <>
      <StatusListener name='order'/>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className='text-2xl'>Orders</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search by user's name, email, shipping address, or delivery status" />
        </div>
        <OrdersTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
