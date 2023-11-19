'use client'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const GitHubSignInButton = () => {
    const callbackUrl = "/"
    return (
        <div className="w-full py-2 lg:px-2 lg:py-0 lg:w-1/3">
            <button className='w-full flex items-center justify-center p-3 bg-cyan-800 rounded-md hover:bg-cyan-600 dark:hover:bg-gray-800' onClick={() => signIn('github', { callbackUrl })} >
                <svg aria-hidden='true'
                    focusable='false'
                    data-icon='github'
                    className='w-5 h-5 inline-block mr-2'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'>
                    <path
                        fill='white'
                        d='M256 8C119 8 8 119 8 256c0 112.9 73.1 208.6 174.2 242.8 12.7 2.3 17.3-5.5 17.3-12.2 0-6-0.2-21.9-0.3-43.1-70.8 15.4-85.9-34.2-85.9-34.2-11.6-29.5-28.3-37.4-28.3-37.4-23.2-15.8 1.8-15.5 1.8-15.5 25.7 1.8 39.2 26.4 39.2 26.4 22.8 39.1 59.9 27.8 74.5 21.3 2.3-16.6 8.9-27.9 16.2-34.3-56.6-6.4-116.2-28.3-116.2-126.1 0-27.9 9.9-50.7 26.2-68.5-2.6-6.4-11.4-32.4 2.5-67.6 0 0 21.5-6.9 70.4 26.2 20.4-5.7 42.3-8.6 64.1-8.7 21.8 0.1 43.7 3 64.1 8.7 48.9-33.1 70.3-26.2 70.3-26.2 14 35.2 5.1 61.2 2.5 67.6 16.4 17.8 26.2 40.6 26.2 68.5 0 97.9-59.7 119.6-116.4 125.9 9.2 7.9 17.3 23.4 17.3 47.1 0 34.1-0.3 61.6-0.3 70 0 6.8 4.5 14.7 17.4 12.2C430.9 464.6 504 368.9 504 256 504 119 393 8 256 8z'
                    ></path>
                </svg>
                <span
                    className="text-xs font-medium text-gray-200 uppercase lg:text-sm dark:text-gray-300">
                    GitHub</span>
            </button>
        </div>
    )
}
