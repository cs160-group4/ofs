'use client'

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function Error({ error, reset, }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (error.digest) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2>Something went wrong!</h2>
        {error?.stack?.includes('mysql2') && (
          <p className="text-red-500">Database connection failed. Please check your database connection.</p>
        )}
        <button className="btn btn-primary text-white m-4"
          onClick={
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Something went wrong!</h2>
      <button className="btn btn-primary text-white m-4"
        onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}