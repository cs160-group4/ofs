'use client'
import { signIn } from 'next-auth/react'

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const TwitchSignInButton = () => {
    const callbackUrl = "/"
    return (
        <div className="w-full py-2 lg:px-2 lg:py-0 lg:w-1/3">
            <button className='w-full flex items-center justify-center p-3 bg-cyan-800 rounded-md hover:bg-cyan-600 dark:hover:bg-gray-800' onClick={() => signIn('twitch', { callbackUrl })} >
                <svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 inline-block mr-2' width="24px" height="24px" viewBox="0 0 256 268" version="1.1" preserveAspectRatio="xMidYMid">
                    <g>
                        <path d="M17.4579119,0 L0,46.5559188 L0,232.757287 L63.9826001,232.757287 L63.9826001,267.690956 L98.9144853,267.690956 L133.811571,232.757287 L186.171922,232.757287 L256,162.954193 L256,0 L17.4579119,0 Z M40.7166868,23.2632364 L232.73141,23.2632364 L232.73141,151.29179 L191.992415,192.033461 L128,192.033461 L93.11273,226.918947 L93.11273,192.033461 L40.7166868,192.033461 L40.7166868,23.2632364 Z M104.724985,139.668381 L127.999822,139.668381 L127.999822,69.843872 L104.724985,69.843872 L104.724985,139.668381 Z M168.721862,139.668381 L191.992237,139.668381 L191.992237,69.843872 L168.721862,69.843872 L168.721862,139.668381 Z"
                            fill="#FFFFFF" />
                    </g>
                </svg>
                <span
                    className="text-xs font-medium text-gray-200 uppercase lg:text-sm dark:text-gray-300">
                    Twitch</span>
            </button>
        </div>
    )
}
