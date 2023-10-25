import { getAuthSession } from "@/api/auth/[...nextauth]/options";
export async function GET(req: Request) {
    const session = await getAuthSession();
    return Response.json(session);
}

export async function POST(req: Request) {
    return { hello: 'world' }
}

