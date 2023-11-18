'use client';
import { deleteUserAction } from '@/actions/users';
import { SubmitButton } from "@/ui/common/Buttons";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState } from 'react-dom';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export function CreateUser() {
    return (
        <Link href="/admin/users/create"
            className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        ><span className="hidden md:block">Create User</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateUser({ id }: { id: string }) {
    return (
        <Link href={`/admin/users/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}


export function DeleteUser({ id }: { id: string }) {
    const initialState = { message: "", errors: {} };
    const [state, formAction] = useFormState(deleteUserAction, initialState)
    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton text="Delete" />
            </form>
        </div>
    );
}
