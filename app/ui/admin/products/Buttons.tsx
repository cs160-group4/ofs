'use client'

import { PencilIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

export function UpdateProduct({id} : {id: number})
{
    return (
        <Link href={`/admin/products/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}