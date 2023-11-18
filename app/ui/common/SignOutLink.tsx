'use client'
import { PowerIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const SignOutLink = () => {
    return (
        <>
            <Link onClick={() => signOut({ callbackUrl: '/' })} href="/" className='flex group items-center'>
                <div className="flex grow items-center gap-2 rounded-md 
                 text-sm font-semibold text-gray-600 transition-colors duration-200 hover:text-gray-800 hover:animate-pulse">
                    <PowerIcon className="w-6 mr-2 group-hover:animate-bounce" />
                    Sign Out
                </div>

            </Link>
        </>

    )
}
