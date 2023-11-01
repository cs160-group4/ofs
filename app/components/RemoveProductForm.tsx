import { TrashIcon } from '@heroicons/react/24/outline';
import { Product } from "@/lib/products"
import { removeProduct } from "app/actions"
import { useFormState, useFormStatus } from "react-dom"

export  function RemoveProductForm({ id }: { id: number }) {
    return (
        <form action={removeProduct}>
            <input type="hidden" name="id" value={id} />
            <button className="rounded-md border p-2 hover:bg-gray-100">
                <span className="sr-only">Delete</span>
                <TrashIcon className="w-5" />
            </button>
        </form>
    )
}