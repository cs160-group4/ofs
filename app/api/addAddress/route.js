import { db } from "@/db/db";
import { addresses } from "@/db/schema";
import { getGeoCoordinates } from "/app/api/getCoordinates"
export const addAddress = async (data: NewAddress) => {
    try {
        const { latitude, longitude } = await getGeoCoordinates(data.addressLine1, data.city, data.state, data.postalCode, data.country);

        data.latitude = latitude;
        data.longitude = longitude;

        return await db.insert(addresses).values(data);
    } catch (error) {
        console.error("Error adding address:", error);
        throw error;
    }
};
