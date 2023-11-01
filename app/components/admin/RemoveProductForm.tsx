import { removeProduct } from "@/actions/products"

export function RemoveProductForm({ id }: { id: number }) {
    return (
        <form action={removeProduct}>
            <input type="hidden" name="id" value={id} />
            <button className="btn btn-error">
                Delete
                <span className="sr-only">Delete</span>
            </button>
        </form>
    )
}