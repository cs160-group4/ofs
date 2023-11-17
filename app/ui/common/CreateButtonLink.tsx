import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import Link from "next/link";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export function CreateButtonLink({ text, link }: { text: string, link: string }) {
    return (
        <Link href={link}
            className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-teal-500 active:bg-teal-600"
        ><span className="hidden md:block">{text}</span>{' '}
            <PlusIcon className="h-5 md:ml-4" />
        </Link>
    );
}