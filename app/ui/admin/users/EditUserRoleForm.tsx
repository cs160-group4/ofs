'use client';
import Link from 'next/link';
import { updateUserRoleAction } from '@/actions/users';
import { useFormState } from 'react-dom';
import { User } from '@/app/lib/users';
import { Button } from '@/ui/common/Button';
import { FormErrorState, roles } from '@/lib/utils';

export default function EditUserRoleForm({ user }: { user: User }) {
    const initialState= { message: "", errors: {} };
    const [state, formAction] = useFormState(updateUserRoleAction, initialState)
    return (
        <form action={formAction} className='flex flex-col gap-4 bg-gray-50 rounded-lg p-4 w-96'>
            <div className="">
                {/* User ID Text */}
                <label htmlFor="user-id" className="block text-sm font-medium">
                    User ID
                </label>
                <input type="hidden"  id="id" name="id" value={user.id} />
                <input
                    id="user-id"
                    name="id"
                    type="text"
                    value={user.id}
                    className="mt-1 block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                    readOnly
                />
                {state?.message ? (
                    <div aria-live="polite" className="my-2 text-sm text-red-500">
                        <p>{state.message}</p>
                    </div>
                ) : null}
            </div>
            <div className="">
                {/* User Name Text */}
                <label htmlFor="name" className="block text-sm font-medium">
                    Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={user.name!}
                    className="mt-1 block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                    readOnly
                />
            </div>
            <div className="">
                <label htmlFor="email" className="block text-sm font-medium">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    value={user.email!}
                    className="mt-1 block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                    readOnly
                />
            </div>

            <div className="mb-4">
                <label htmlFor="role" className="mb-2 block text-sm font-medium">
                    Choose a role
                </label>
                <div className="relative">
                    <select
                        id="role"
                        name="role"
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                        defaultValue={user.role}
                        aria-describedby="role-error">
                        <option value="" disabled>
                            Select a role
                        </option>
                        {roles?.map((role) => (
                            <option key={role} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                </div>

                {state?.errors?.role ? (
                    <div
                        id="role-error"
                        aria-live="polite"
                        className="mt-2 text-sm text-red-500"
                    >
                        {state.errors.role.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))}
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
