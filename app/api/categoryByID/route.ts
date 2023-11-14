import { getCategoryNameById } from '@/lib/categories';

export async function GET(req: Request) {
    const url = new URL(req.url)
    const categoryID : any = url.searchParams.get("categoryID")
    return Response.json(await getCategoryNameById(categoryID));
}



