import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import Link from 'next/link';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function UserLayout({ children, }: { children: React.ReactNode }) {
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
        <>
            {children}
        </>
    );
}
