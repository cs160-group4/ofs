import OrdersStatusComponent from '@/components/OrdersStatusComponent';
import CommentsComponent from '@/components/products/CommentsComponent';
import { getComments } from '@/lib/comments';
import { getOrders } from '@/lib/orders';
import { getProducts } from '@/lib/products';
import { getUsers } from '@/lib/users';
import Link from 'next/link';
// import Cards from '@/ui/admin/Cards';
import Cards from '@/ui/admin/Cards';
import RevenueChart from '@/ui/admin/RevenueChart';
import LatestOrders from '@/ui/admin/LatestOrders';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/ui/skeletons';

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
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestOrders />
        </Suspense>
      </div>
    </main>
    </>
  );
}
