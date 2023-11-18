'use client'
import { Metadata } from 'next'
import { useEffect } from 'react'

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
    title: 'Error | OFS Admin Dashboard',
    description: 'Error page',
}

export default function Error({ error, reset }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="text-center p-8 space-y-4">
            <h2>Something went wrong!</h2>
            <button className="btn btn-primary text-white" onClick={() => reset()}>
                Try again
            </button>
        </div>
    )
}