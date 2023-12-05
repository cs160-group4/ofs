'use client'
import { DeleteCategory } from "@/ui/admin/categories/Buttons";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "../../common/Button";
import { useFormState } from "react-dom";
import { deleteCategoryAction } from "@/app/actions/categories";
import { DeleteButton } from "../../common/Buttons";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export function DeleteCategoryConfirmation({ id }: { id: number }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const openModal = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('id', id.toString());
        replace(`${pathname}?${params.toString()}`);
        let modal = document?.getElementById('delete_confirmation_modal') as HTMLDialogElement;
        modal?.showModal();
    }, 0);
    return (
        <>
            <div>
                <button onClick={openModal} className="rounded-md border p-2 hover:bg-gray-100"> <TrashIcon className="w-5" /></button>
            </div>
        </>
    );
}

export function DeleteCategoryDialog() {
    const initialState = { message: "", errors: {} };
    const [state, formAction] = useFormState(deleteCategoryAction, initialState)
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    let id = Number(searchParams.get('id'));
    const closeModal = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.delete('id');
        replace(`${pathname}?${params.toString()}`);
        let modal = document?.getElementById('delete_confirmation_modal') as HTMLDialogElement;
        modal?.close();
    }, 0);
    return (
        <>
            <dialog id="delete_confirmation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Confirmation</h3>
                    <p className="py-4">Are you sure you want to delete this category?</p>
                    <p>All data about this category will be permanently removed (including all products of this category). This action cannot be undone.</p>
                    <div className="flex gap-2 modal-action">
                        <div>
                            <form method="dialog">
                                <Button onClick={closeModal} className="flex items-center justify-center w-24 h-10 rounded-lg bg-gray-400 text-sm font-medium hover:bg-gray-500 active:bg-gray-500">
                                    Cancel
                                </Button>
                            </form>
                        </div>
                        <div>
                            <div>
                                <form action={formAction} method="dialog" onClick={closeModal}>
                                    <input type="hidden" name="id" value={id} />
                                    <DeleteButton text="Delete" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}
