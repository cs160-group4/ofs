import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import Link from "next/link";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export function UpdateOrder({ id }: { id: number }) {
    return (
        <Link href={`/admin/orders/${id}/edit`} className="rounded-md border p-2 hover:bg-gray-100">
            <PencilIcon className="w-5" />
        </Link>
    );
}
