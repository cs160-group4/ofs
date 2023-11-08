import Image from 'next/image'
import Link from 'next/link'
import { getAuthSession } from '@/api/auth/[...nextauth]/options'
import React from 'react';
export default async function OrderSummary() {
    const session = await getAuthSession();
    const name = session?.user?.name;
    if(!name) {
        return <main className="flex items-center justify-center h-screen">
                    <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                        <div className="flex flex-col items-center">
                            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                                <span className="text-black">Please Login Before You<br></br>Can See Your Order Summary</span> 
                            </h6>
                            <Link href="/auth/signin" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </main>
    }
    return (
       <>
            
       </>
    )
}
