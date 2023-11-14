'use client';
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteCommentAction } from '@/actions/comments';
import { useFormState } from 'react-dom';

export function DeleteComment({ id }: { id: number }) {
    const initialState = { message: "", errors: {} };
    const [state, formAction] = useFormState(deleteCommentAction, initialState)
    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    );
}
