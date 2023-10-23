import { getProductByName } from "@/lib/products";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const name : any = url.searchParams.get("name")
    return Response.json(await getProductByName(name));
}



