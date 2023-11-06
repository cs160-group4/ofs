import { db, orders, addresses } from "@/db/db";
import { eq } from "drizzle-orm";

export default async (req, res) => {
    const result = await db.select().from(orders)
        .leftJoin(addresses, eq(orders.shippingAddressId, addresses.id))
        .where(eq(orders.deliveryStatus, 'pending'));

    res.json(result);
};
