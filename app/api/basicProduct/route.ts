
import { getBasicProduct } from "../../lib/getData";
 
export async function GET(req: Request) {
    return Response.json(await getBasicProduct());
}

export async function POST(req: Request) {
    return Response.json(await getBasicProduct());
}


