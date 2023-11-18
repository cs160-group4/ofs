import CreateForm from '@/ui/admin/categories/CreateForm';
import Breadcrumbs from '@/ui/common/Breadcrumbs';
import { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
    title: 'Create Category | OFS Admin Dashboard',
    description: 'Create Category page',
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
