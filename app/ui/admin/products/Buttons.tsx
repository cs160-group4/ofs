'use client'

import { PencilIcon } from "@heroicons/react/24/outline"
import Link from "next/link"


export function UpdateProduct({id} : {id: number})
{
    return (
        <Link href={`/admin/products/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}