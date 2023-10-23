
import { getProducts } from "@/lib/products";
 
export async function GET(req: Request) {
    return Response.json(await getProducts());
}

export async function POST(req: Request) {
    return Response.json(await getProducts());
}


