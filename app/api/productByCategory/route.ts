import { getProductByCategoryName } from "@/lib/products";

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export async function GET(req: Request) {
    const url = new URL(req.url)
    const slug : any = url.searchParams.get("slug")
    const priceSort : any = url.searchParams.get("priceSort")
    const nameSort : any = url.searchParams.get("nameSort")
    return Response.json(await getProductByCategoryName(slug, priceSort, nameSort));
}



