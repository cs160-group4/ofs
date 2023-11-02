import EditUserRoleForm from '@/ui/admin/users/EditUserRoleForm';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import { getUser } from '@/lib/users';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import clsx from 'clsx';
import Link from 'next/link';
import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';

export const metadata: Metadata = {
    title: 'Edit User',
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


