'use client';
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteCommentAction } from '@/actions/comments';
import { useFormState } from 'react-dom';
import { SubmitButton } from "@/ui/common/Buttons";

export function DeleteComment({ id }: { id: number }) {
    const initialState = { message: "", errors: {} };
    const [state, formAction] = useFormState(deleteCommentAction, initialState)
    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="id" value={id} />
                <SubmitButton text="Delete" />
            </form>
        </div>
    );
}
