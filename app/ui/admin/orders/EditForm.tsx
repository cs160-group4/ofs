'use client';
import { editDeliveryStatusAction } from '@/actions/orders';
import { Order } from '@/app/lib/orders';
import { orderStatus } from '@/app/lib/utils';
import { SubmitButton } from '@/ui/common/Buttons';
import {
    CubeTransparentIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useFormState } from 'react-dom';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/


export default function EditDeliveryStatusForm({ item }: { item: Order }) {
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useFormState(editDeliveryStatusAction, initialState);
    return (
        <form action={formAction}>
            <input type="hidden" name="id" defaultValue={item.id} />
            <div className="rounded-md bg-gray-50 p-4 md:p-6 max-w-sm">
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Order ID
                    </label>
                    <div className="relative">
                        <input id="name" name="name" type="text" disabled
                            defaultValue={item.id}
                            className="input input-bordered peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500  focus:ring-0 focus:ring-gray-500 focus:border-teal-500"
                            aria-describedby="id-error" required minLength={1} maxLength={50} />
                        <CubeTransparentIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                    {state?.errors?.id ? (
                        <div id="id-error" aria-live="polite" className="mt-2 text-sm text-red-500">
                            {state?.errors?.id?.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="deliveryStatus" className="mb-2 block text-sm font-medium">
                        Choose a delivery status
                    </label>
                    <div className="relative">
                        <select
                            id="deliveryStatus"
                            name="deliveryStatus"
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue={item.deliveryStatus}
                            aria-describedby="status-error">
                            <option value="" disabled>
                                Select a status
                            </option>
                            {orderStatus?.map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    {state?.errors?.deliveryStatus ? (
                        <div
                            id="status-error"
                            aria-live="polite"
                            className="mt-2 text-sm text-red-500"
                        >
                            {state.errors.deliveryStatus.map((error: string) => (
                                <p key={error}>{error}</p>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
            <div className="mt-4 flex  gap-4">
                <Link href="/admin/orders" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium 
                text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Link>
                <SubmitButton text="Save" />
            </div>
        </form>
    );
}
