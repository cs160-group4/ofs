'use client'
import { PowerIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export const SignOutLink = () => {
    return (
        <>
            <Link onClick={() => signOut({ callbackUrl: '/' })} href="/" className='flex group items-center justify-center '>
                <div className="flex items-center
                 text-sm font-semibold text-gray-600 transition-colors duration-200 hover:text-gray-800 hover:animate-pulse">
                    <PowerIcon className="w-6 mr-2 group-hover:animate-bounce" />

                    {/* <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18"
                        height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg> */}
                    Sign Out
                </div>

            </Link>
        </>

    )
}
