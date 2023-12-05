import { SearchQueryProps } from '@/app/lib/utils';
import { getCategories } from '@/app/lib/categories';
import StatusListener from '@/app/ui/common/StatusListener';
import AddProductButtonComponent from '@/components/AddProductModal';
import { getProducts } from '@/lib/products';
import { Metadata } from 'next';
import Search from '@/app/ui/common/Search';
import ProductTable from '@/app/ui/admin/products/Table';

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Products | OFS Admin Dashboard',
};

export default async function AdminProducts( {searchParams}:{searchParams: SearchQueryProps} ) {
  const query = searchParams?.query || '';
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <>
      <StatusListener name='product' />
      <div className='flex flex-col mx-6 pt-7 gap-y-5'>
        {/* title/header */}
        <div className='flex flex-col pb-6 items-center lg:items-start text-center'>
          <h1 className='text-2xl font-bold'>Catalogue</h1>
          <p className='text-base'>Add, delete, or make quick updates to your existing product catalogue</p>
        </div>
        {/* management tools container */}
        <div className='flex flex-col w-full sm:flex-row justify-between items-center max-w-full gap-2 md:mt-8'>
          <Search placeholder="Search Products by id, name, slug, description, or brand" />
          <AddProductButtonComponent categories={categories} />
        </div>
        {/* product list items */}
        <div className='overflow-x-auto pb-7'>
          <ProductTable query={query} />
        </div>
      </div>
    </>
  )
}