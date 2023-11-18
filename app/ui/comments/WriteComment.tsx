'use client'
import { SignInButton } from "@/app/components/SignInButton";
import { writeCommentAction } from '@/actions/comments';
import { useFormState } from "react-dom";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default function WriteComment({ productId, signedIn }: { productId: number, signedIn: boolean }) {
    const initialState = { message: "", errors: {} };
    const [state, formAction] = useFormState(writeCommentAction, initialState)
    return (
        <>
            <div className="mt-6 rounded-md ">
                <h2 className="mb-6 text-2xl font-black text-left ">
                    Write a comment</h2>
                {signedIn ? (
                    <div className="flex flex-col mb-6 max-w-2xl">
                        <form action={formAction} >
                            <input type="hidden" id="productId" name="productId" value={productId} />
                            <div className="px-2 mb-6">
                                <textarea required id="text" name="text" rows={5} minLength={1} maxLength={255}
                                    placeholder="write a review"
                                    className="block w-full px-4 leading-tight text-gray-700 bg-gray-100 rounded hover:border-primary focus:border-primary" />
                            </div>
                            <div className="px-2">
                                <button
                                    className="px-4 py-2 font-medium text-gray-100 bg-primary rounded shadow hover:bg-teal-400 " >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="flex items-center justify-center mb-6" >
                        <SignInButton />
                    </div>)
                }

            </div>
        </>
    )
}