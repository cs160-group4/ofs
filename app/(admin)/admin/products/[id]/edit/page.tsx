import Form from '@/components/products/EditProduct';
import Breadcrumbs from './breadcrumbs';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Edit Product',
};

export default async function Page({ params }: { params: { id: string } }) {
    if (!params.id) {
        const id = Number(params.id);
        const product = await getProductById(id)
        if (!product) {
            notFound();
        }
    }
    return (
        <main>
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
