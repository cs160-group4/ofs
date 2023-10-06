import { db } from '../db/db'
import { reviews } from "../db/schema"
type Review = {
    id: number;
    name: string;
}

export const getReviews = async () => {
    const result: Review[] = await db.select().from(reviews);
    return result;
}