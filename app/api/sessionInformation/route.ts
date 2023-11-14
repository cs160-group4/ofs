import { getAuthSession } from "../auth/[...nextauth]/options";
 
export async function GET(req: Request) {
    return Response.json(await getAuthSession());
}


