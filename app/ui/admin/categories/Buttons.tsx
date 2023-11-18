'use client'
import { deleteCategoryAction } from '@/actions/categories';
import { SubmitButton } from '@/ui/common/Buttons';
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState } from 'react-dom';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export function CreateCategoryLink() {
    return (
        <Link href="/admin/categories/create"
            className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-teal-500 active:bg-teal-600"
        ><span className="hidden md:block">Create Category</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}

export function UpdateCategory({ id }: { id: number }) {
    return (
        <Link href={`/admin/categories/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}



export function DeleteCategory({ id }: { id: number }) {
    const initialState = { message: "", errors: {} };
    const [state, formAction] = useFormState(deleteCategoryAction, initialState)
    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton text="Delete" />
            </form>
        </div>
    );
}


