import CreateForm from '@/ui/admin/categories/CreateForm';
import Breadcrumbs from '@/ui/common/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Category',
};

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Categories', href: '/admin/categories' },
                    {
                        label: 'Create Category',
                        href: '/admin/categories/create',
                        active: true,
                    },
                ]}
            />
            <CreateForm />
        </main>
    );
}
