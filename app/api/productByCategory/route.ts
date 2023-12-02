import { getProductByCategoryName } from "@/lib/products";

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export async function GET(req: Request) {
    const url = new URL(req.url)
    const slug : any = url.searchParams.get("slug")
    const sortBy : any = url.searchParams.get("sortBy")
    const sortDirection : any = url.searchParams.get("sortDirection")
    return Response.json(await getProductByCategoryName(slug, sortBy, sortDirection));
}



