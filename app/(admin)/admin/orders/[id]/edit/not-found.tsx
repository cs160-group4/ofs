'use client';
import '@/app/globals.css';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';
import Link from "next/link";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Not Found | OFS Admin Dashboard',
  description: 'Not Found page',
};

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>Could not find the requested order.</p>
            <Link
                href="/admin/orders" 
                className="btn btn-primary mt-4 rounded-md  px-4 py-2 text-sm text-white transition-colors hover:bg-teal-400">
                Go Back
            </Link>
        </main>
    );
}
