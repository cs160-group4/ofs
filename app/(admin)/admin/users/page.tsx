import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import UsersTable from '@/ui/admin/users/Table';
import { CreateUser } from '@/ui/admin/users/Buttons';
import { UsersTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getUsersPages } from '@/app/lib/users';
import { Metadata } from 'next';
import { SearchQueryProps } from '@/app/lib/utils';
import HandleStatus from '@/app/ui/common/HandleStatus';

export const metadata: Metadata = {
  title: 'Users',
};

export default async function UserPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getUsersPages(query);

  return (
    <>
      <HandleStatus />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className='text-2xl'>Users</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search users by name, email, or role" />
          <CreateUser />
        </div>
        <UsersTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
