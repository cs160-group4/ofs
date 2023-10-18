import Link from "next/link"

export const SignInButton = () => {
    return (
        <Link href="/auth/sign-in">
            <button className='flex items-center justify-center p-2 btn-primary w-auto rounded-md m-2 '> <span
                className="text-xs font-medium text-white">
                Sign In</span>
            </button>
        </Link>

    )
}
