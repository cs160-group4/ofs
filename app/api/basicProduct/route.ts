
import { getProducts } from "@/lib/products";
 
/*
  Author: Kyle Chen
  Email: kyle.chen@sjsu.edu
  Copyright (c) 2023 Kyle Chen. All rights reserved.
*/

export async function GET(req: Request) {
    return Response.json(await getProducts());
}

export async function POST(req: Request) {
    return Response.json(await getProducts());
}


