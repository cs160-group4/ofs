'use client'
import Link from 'next/link'

import { createUser } from '@/actions/users'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
const initialState = {
    message: null,
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending} className="w-full px-4 py-4 text-sm font-bold text-white uppercase bg-cyan-600 rounded-md lg:text-lg dark:text-gray-300 dark:bg-cyan-800 hover:bg-cyan-700 dark:hover:bg-cyan-900">
            Register
        </button>
    )
}

export function RegisterForm() {
    const [state, formAction] = useFormState(createUser, initialState)
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            <h2 className="mb-4 text-3xl font-bold text-gray-700 lg:mb-7 lg:text-5xl dark:text-gray-300 ps-16 pe-16">
                Sign Up
            </h2>
            <form action={formAction}>
                <div className="mb-4 lg:mb-7">
                    <input type="text" minLength={3} maxLength={20} pattern="[A-Za-z0-9]+" title="Only letters and numbers are allowed"
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
                        <input type={showPassword ? "text" : "password"} required minLength={8}
                            className="w-full px-4 py-4 bg-white rounded-lg lg:py-5 "
                            id="password" name="password" placeholder="Enter password" />
                        <label className="swap swap-rotate absolute right-0 mr-3 items-center">
                            <input type="checkbox" onClick={togglePasswordVisibility} className="hidden" />
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                className="swap-off fill-current w-5 h-5 " fill="currentColor"
                                viewBox="0 0 16 16" >
                                <path
                                    d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z">
                                </path>
                                <path
                                    d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z">
                                </path>
                                <path
                                    d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z">
                                </path>
                            </svg>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                                className="swap-on fill-none w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </label>
                    </div>
                </div>
                <div className="mb-4 lg:mb-7">
                    <input type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-4 bg-white rounded-lg lg:py-5" required minLength={8}
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