import StatusListener from '@/app/ui/common/StatusListener';
import { getCommentsPages } from '@/lib/comments';
import { SearchQueryProps } from '@/lib/utils';
import CommentsTable from '@/ui/admin/comments/Table';
import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Comments | OFS Admin Dashboard',
  description: 'Comments page',
};
export default async function CommentPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getCommentsPages(query);

  return (
    <>
      <StatusListener name='comment' />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className='text-2xl'>Comments</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search comments by text, user's name, or product name" />
        </div>
        <CommentsTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </>
  );
}
