import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import { Metadata } from 'next';
import { getCategoriesPages } from '@/lib/categories';
import CategoriesTable from '@/ui/admin/categories/Table';
import { CreateCategoryLink } from '@/ui/admin/categories/Buttons';
import { SearchQueryProps } from '@/app/lib/utils';
import HandleStatus from '@/app/ui/common/HandleStatus';

// export const metadata: Metadata = {
//   title: 'Categories | Admin',
// };

export default async function CategoryPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getCategoriesPages(query);
  return (<>
    <HandleStatus />
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
