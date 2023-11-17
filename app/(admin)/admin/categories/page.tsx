import { SearchQueryProps } from '@/app/lib/utils';
import StatusListener from '@/app/ui/common/StatusListener';
import { getCategoriesPages } from '@/lib/categories';
import { CreateCategoryLink } from '@/ui/admin/categories/Buttons';
import CategoriesTable from '@/ui/admin/categories/Table';
import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Categories | OFS Admin Dashboard',
  description: 'Categories page',
};

export default async function CategoryPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getCategoriesPages(query);
  return (<>
    <StatusListener name='category' />
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className='text-2xl'>Product Categories</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search categories by name, slug or description" />
        <CreateCategoryLink />
      </div>
      <CategoriesTable query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  </>
  );
}
