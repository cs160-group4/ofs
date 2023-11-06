import Form from '@/app/ui/products/EditProduct';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import { getProductById } from '@/lib/products';
import Image from 'next/image'
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { UpdateProductForm } from '@/app/components/admin/UpdateProductComponent';

export const metadata: Metadata = {
    title: 'Edit Product',
};

export default async function Page({ params }: { params: { id: string } }) {
    try {
        console.log(params.id);
        if (!params.id) {
            let id = Number(params.id)
            const product = await getProductById(id)
            if (!product) {
                notFound();
            }
        }
        notFound();
    } catch (err) {
        console.log(err);
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
