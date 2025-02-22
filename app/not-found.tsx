'use client';
import Link from "next/link";
import '@/app/globals.css'
import { useRouter } from "next/navigation";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function Custom404() {
    const router = useRouter();
    return (
        <>
            <main className="flex items-center justify-center h-screen">
                <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-9xl">404</h1>
                        <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                            <span className="text-red-500">Oops!</span> Page not found
                        </h6>
                        <p className="mb-8 text-center text-gray-500 md:text-lg">
                            The page you’re looking for doesn’t exist.
                        </p>
                        <Link href="/" onClick={() =>router.back()} className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                            Go back
                        </Link>
                    </div>
                </div>
            </main>

        </>
    )
}
