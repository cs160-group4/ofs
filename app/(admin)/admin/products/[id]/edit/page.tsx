import Form from '@/app/ui/products/EditProduct';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import { getProductById } from '@/lib/products';
import Image from 'next/image'
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { UpdateProductForm } from '@/app/components/admin/UpdateProductComponent';
import { getCategories } from '@/app/lib/categories';

export const metadata: Metadata = {
    title: 'Edit Product',
};

export default async function Page({ params }: { params: { id: string } }) {
    try {
        if (!params.id) {
            let id = Number(params.id)
            const product = await getProductById(id)
            if (!product) {
                notFound();
            }
        }
        else {
            let id = Number(params.id)
            const product = await getProductById(id)
            const categories = await getCategories();
            
            return (
                <main>
                    <Breadcrumbs
                        breadcrumbs={[
                            { label: 'Catalogue', href: '/admin/products' },
                            {
                                label: 'Edit Product',
                                href: `/admin/products/${id}/edit`,
                                active: true,
                            },
                        ]}
                    />
                    <div className='flex flex-col mx-6 pt-7 gap-y-5'>
                        <div className='flex flex-col pb-6 items-center lg:items-start text-center'>
                            <p className='font-bold text-3xl'>Edit Product</p>
                            <p className='text-base'>Make changes to an existing products details and attributes</p>
                        </div>
        
                        <UpdateProductForm product={product} categories={categories}/>
                    </div>
                    {/* <Form product={product} /> */}
                </main>
            );
        }
        notFound();
    } catch (err) {
        notFound();
    }
}
