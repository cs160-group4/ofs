import { getCategoryNameById } from '@/lib/categories';

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export async function GET(req: Request) {
    const url = new URL(req.url)
    const categoryID : any = url.searchParams.get("categoryID")
    return Response.json(await getCategoryNameById(categoryID));
}



