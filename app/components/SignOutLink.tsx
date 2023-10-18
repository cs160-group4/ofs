'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export const SignOutLink = () => {
    return (
        <Link onClick={() => signOut()} href="/">Log Out</Link>
    )
}
