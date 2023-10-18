
import { getReviews } from "@/lib/reviews";
import { get } from "http";

export async function GET(req: Request) {
    return Response.json(await getReviews());
}

export async function POST(req: Request) {
    return Response.json(await getReviews());
}


