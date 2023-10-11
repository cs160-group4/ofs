import { getProductFromID } from "../../lib/getData";

export async function GET(req: Request) {
    return Response.json(await getProductFromID());
}

export async function POST(req: Request) {
    const body = await req.json()
    return Response.json(await getProductFromID(body.id));
}


