
// import Cards from '@/ui/admin/Cards';
import Cards from '@/ui/admin/Cards';
import RevenueChart from '@/ui/admin/RevenueChart';
import LatestOrders from '@/ui/admin/LatestOrders';
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestOrdersSkeleton,
  CardsSkeleton,
} from '@/ui/skeletons';
import OrdersStatusComponent from '@/components/OrdersStatusComponent';
// Todo: Add a component to show the status of orders
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
