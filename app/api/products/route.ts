import { getProducts, getProductById } from "@/lib/products";

export async function GET(req: Request) {
    return Response.json(await getProducts());
}

export async function POST(req: Request) {
    const body = await req.json()
    return Response.json(await getProductById(body.id));
}


