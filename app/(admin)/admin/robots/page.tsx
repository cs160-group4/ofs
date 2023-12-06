import { checkRobotStatus } from '@/app/lib/delivery';
import { SearchQueryProps } from '@/app/lib/utils';
import StatusListener from '@/app/ui/common/StatusListener';
import { getRobots, getRobotsPages } from '@/lib/robots';
import RobotsTable from '@/ui/admin/robots/Table';
import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Robots | OFS Admin Dashboard',
};

export default async function OrdersPage({ searchParams }: { searchParams: SearchQueryProps }) {
  // get all robots
  const robots = await getRobots();
  for (let i = 0; i < robots.length; i++) {
    const robot = robots[i];
    await checkRobotStatus(robot.id);
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getRobotsPages(query);
  return (
    <>
      <StatusListener name='robot' />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className='text-2xl'>Robots</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search by robot's name, status, or carrying capacity" />
        </div>
        <RobotsTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
