import { SearchQueryProps } from '@/app/lib/utils';
import StatusListener from '@/app/ui/common/StatusListener';
import { getDeliveryPages } from '@/lib/delivery';
import MapBox from '@/ui/admin/mapbox/map';
// import DeliveryTable from '@/ui/admin/delivery/Table';
// import Pagination from '@/ui/common/Pagination';
// import Search from '@/ui/common/Search';
// import { Metadata } from 'next';
import { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Delivery | OFS Admin Dashboard',
  description: 'Delivery page',
};

export default async function DeliveryPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getDeliveryPages(query);
  return (
    <>
      <StatusListener name='delivery' />
      <div className="w-full">
        <MapBox />
        {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search by delivery status" />
          </div>
          <DeliveryTable query={query} currentPage={currentPage} />
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div> */}
      </div>
    </>
  );
}
