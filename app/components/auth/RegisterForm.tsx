'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { createUser } from '@/actions/users'

import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

const initialState = {
    message: null,
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending} className="w-full px-4 py-4 text-sm font-bold text-gray-300 uppercase bg-cyan-600 rounded-md lg:text-lg dark:text-gray-300 dark:bg-cyan-800 hover:bg-cyan-700 dark:hover:bg-cyan-900">
            Add
        </button>
    )
}

export function RegisterForm() {
    const [state, formAction] = useFormState(createUser, initialState)

    return (
        <>
            <h2 className="mb-4 text-3xl font-bold text-gray-700 lg:mb-7 lg:text-5xl dark:text-gray-300 ps-16 pe-16">
                Register</h2>
            <form action={formAction}>
                <div className="mb-4 lg:mb-7">
                    <input type="text"
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 "
                        id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="mb-4 lg:mb-7">
                    <input type="email"
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 "
                        id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="mb-4 lg:mb-7">
                    <div className="relative flex items-center">
                        <input type="password"
                            className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 "
                            id="password" name="password" placeholder="Enter password" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            className="absolute right-0 mr-3 dark:text-gray-300" fill="currentColor"
                            viewBox="0 0 16 16">
                            <path
                                d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z">
                            </path>
                            <path
                                d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z">
                            </path>
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path></svg>
                    </div>
                </div>
                <div className="mb-4 lg:mb-7">
                    <input type="password"
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 "
                        id="confirmPassword" name="confirmPassword" placeholder="Confirm password" />
                </div>

                {/* <input type="text" id="todo" name="todo" required /> */}
                <SubmitButton />

                {/* {state?.message} */}
                {/* If state.success = false -> make a div with error*/}
                <div>
                    {state?.success === false && state.error && (
                        <div className="text-red-500">
                            {state.error.name?._errors && (
                                <div>{state.error.name._errors[0]}</div>
                            )}
                            {state.error.password?._errors && (
                                <div>{state.error.password._errors[0]}</div>
                            )}
                            {state.error.confirmPassword?._errors && (
                                <div>{state.error.confirmPassword._errors[0]}</div>
                            )}
                        </div>
                    )}
                </div>



            </form >

            <p className="px-2 mt-6 text-sm text-left text-gray-700 dark:text-gray-400">
                Already have an account?&nbsp;
                <Link href="/auth/signin" className="text-sm font-semibold text-cyan-400 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-500">
                    Sign in
                </Link>
            </p>



        </>

    )
}

{/* <div className="w-full py-2 lg:px-2 lg:py-0 lg:w-1/3">
                <button className='w-full flex items-center justify-center p-3 bg-cyan-800 rounded-md hover:bg-cyan-600 dark:hover:bg-gray-800'
                    type='submit'>
                    <svg aria-hidden='true'
                        focusable='false'
                        data-icon='github'
                        className='w-6 h-6 inline-block mr-2'
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
                        Submit</span>
                </button>
</div> */}
