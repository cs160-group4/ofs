import SideNavigation from '@/ui/admin/SideNavigation';
import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import Link from 'next/link';

export default async function AdminLayout({ children, }: { children: React.ReactNode }) {
    const session = await getAuthSession();
    if (!session || !session.user || session.user.role !== "admin") {
        return <>
            <div className="flex flex-col justify-center items-center h-96">
                <h1 className='text-3xl font-bold m-12'>You are not authorized to view this page</h1>
                <div>
                    <Link href="/" className='btn btn-primary text-white'>Go back to home page</Link>
                </div>
            </div>
        </>
    }
    return (
        <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNavigation />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}
