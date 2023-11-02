import Form from '@/app/ui/products/EditProduct';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
