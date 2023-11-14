import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import { Metadata } from 'next';
import CommentsTable from '@/ui/admin/comments/Table';
import {getCommentsPages } from '@/lib/comments';
import { SearchQueryProps } from '@/lib/utils';

export default async function CommentPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getCommentsPages(query);

  return (
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
  );
}
