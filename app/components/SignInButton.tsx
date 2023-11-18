import Link from "next/link"

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const SignInButton = () => {
  return (
    <Link href="/auth/sign-in">
      <button className='flex items-center justify-center p-2 btn-primary w-auto rounded-md m-2 '>
        <span
          className="btn text-xs btn-primary font-medium text-white">
          Sign In</span>
      </button>
    </Link>

  )
}
