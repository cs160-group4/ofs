
// import Cards from '@/ui/admin/Cards';
import Cards from '@/ui/admin/Cards';
import LatestOrders from '@/ui/admin/LatestOrders';
import RevenueChart from '@/ui/admin/RevenueChart';
import {
  CardsSkeleton,
  LatestOrdersSkeleton,
  RevenueChartSkeleton,
} from '@/ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'OFS Admin Dashboard',
  description: 'Admin Dashboard',
};


export default async function AdminMainPage() {
  return (
    <>  
    <main className="overflow-auto">
      <h1 className='mb-4 text-xl md:text-2xl'>
      Administration Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <Cards />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 overflow-y-hidden">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestOrdersSkeleton />}>
          <LatestOrders />
        </Suspense>
      </div>
    </main>
    </>
  );
}
