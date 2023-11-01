'use client';

import Link from 'next/link';
import { updateUserRoleAction } from '@/actions/users';
import { useFormState } from 'react-dom';
import { User } from '@/app/lib/users';
import { Button } from '@/ui/common/Button';
export default function Form({ user }: { user: User }) {
    const initialState = { message: null, errors: {} };
    const [state, formAction] = useFormState(updateUserRoleAction, initialState)
    // const [state, dispatch] = useFormState(updateUserRoleAction, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* User ID */}
                <input type="hidden" name="id" value={user.id} />
                {state.message ? (
                    <div aria-live="polite" className="my-2 text-sm text-red-500">
                        <p>{state.message}</p>
                    </div>
                ) : null}
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/admin/users"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit" className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary">
                    Save
                </Button>
            </div>
        </form>
    );
}
