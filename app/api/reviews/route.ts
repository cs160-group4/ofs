
import { getReviews } from "../../lib/getData";
 
export async function GET(req: Request) {
    return Response.json(await getReviews());
}

export async function POST(req: Request) {
    return Response.json(await getReviews());
}


