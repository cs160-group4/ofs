'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export default function ShopCategoryQuantityComponent({ quantity }: { quantity: number }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  let quantityOptions: any = [];
  for (let i = 1; i <= quantity; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>);
  }

  const handleSearch = useDebouncedCallback((term) => {

    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('quantity', term);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <select
        id="quantitySelect"
        onChange={(e: { target: { value: any; }; }) => {
          handleSearch(e.target.value);
        }}>
        {quantityOptions}
      </select>
    </div>

  );
}
