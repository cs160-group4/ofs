import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import { getUser } from '@/lib/users';
import EditUserRoleForm from '@/ui/admin/users/EditUserRoleForm';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
    title: 'Edit User | OFS Admin Dashboard',
    description: 'Edit User page',
};

export default async function Page({ params }: { params: { id: string } }) {
    const session = await getAuthSession();
    const currentUser = session?.user;
    if (currentUser?.id === params.id) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <h1 className="text-4xl font-bold text-center">You can not edit your own user</h1>
                <Link href="/admin/users" className='btn btn-primary text-white m-6'>
                    Go back to users
                </Link>
            </div>
        )
    }
    const id = params.id;
    const [user] = await Promise.all([
        getUser(id),
    ]);

    if (!user) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Users', href: '/admin/users' },
                    {
                        label: 'Edit User',
                        href: `/admin/users/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <EditUserRoleForm user={user} />
        </main>
    );
}


