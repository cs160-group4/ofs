import Form from '@/components/products/EditProduct';
import Breadcrumbs from './breadcrumbs';
import { getProductById } from '@/lib/products';
import Image from 'next/image'
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { UpdateProductForm } from '@/app/components/admin/UpdateProductComponent';

export const metadata: Metadata = {
    title: 'Edit Product',
};

export default async function Page({ params }: { params: { id: string } }) {
    const id = Number(params.id);
    const product = await getProductById(id)
    if (!product) {
        notFound();
    }
    return (
        <main>
            <div className='flex flex-col mx-6 pt-7 gap-y-5'>
                <div className='flex flex-col pb-6 items-center lg:items-start text-center'>
                    <p className='font-bold text-3xl'>Edit Product</p>
                    <p className='text-base'>Make changes to an existing product's details and attributes</p>
                </div>

                <UpdateProductForm product={product} />
            </div>
            {/* <Breadcrumbs
                breadcrumbs={[
                    { label: 'Products', href: '/admin/products' },
                    {
                        label: 'Edit Product',
                        href: `/admin/products/${id}/edit`,
                        active: true,
                    },
                ]}
            /> */}
            {/* <Form product={product} /> */}
        </main>
    );
}
