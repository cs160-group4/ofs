'use client'
import { Product } from "@/lib/products"
import { removeProduct } from "app/actions"
import { experimental_useFormStatus as useFormStatus} from "react-dom"

function DeleteButton() {
    const { pending } = useFormStatus()

    return (
        <button 
            type="submit" 
            className="btn btn-error rounded-box" 
            aria-disabled={pending}>
            Delete
        </button>
    )
}

export function RemoveProductForm({ product }: { product:Product}){
    const remove = removeProduct.bind(null, product)
    return (
        <form id='rm-form' action={ remove }>
            <DeleteButton/>
        </form>
    )
}