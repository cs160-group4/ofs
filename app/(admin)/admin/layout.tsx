import { getAuthSession } from '@/api/auth/[...nextauth]/options';
import '@/app/globals.css';
import SideNavigation from '@/ui/admin/SideNavigation';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { Metadata } from 'next';
import Link from 'next/link';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
    title: 'OFS Admin Dashboard',
    description: 'Order food from your OFS groceries.',
    icons: '/favicon.ico',
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
    const session = await getAuthSession();
    // check if the user is logged in and is an admin or employee
    if (!session || !session.user || (session.user.role !== "admin" && session.user.role !== "employee")) {
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
            <html lang="en" data-theme="cupcake" className={`${GeistSans.variable} ${GeistMono.variable}`}>
                <body >
                    <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
                        <div className="w-full flex-none md:w-64">
                            <SideNavigation user={session.user} />
                        </div>
                        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
                    </div>
                </body>
            </html>
        </>
    );
}
