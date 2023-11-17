import { getProductByName } from "@/lib/products";

/*
  Author: Aaron Low
  Email: aaron.c.low@sjsu.edu
  Copyright (c) 2023 Aaron Low. All rights reserved.
*/

export async function GET(req: Request) {
    const url = new URL(req.url)
    const name : any = url.searchParams.get("name")
    return Response.json(await getProductByName(name));
}



