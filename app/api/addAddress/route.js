import { db } from "@/db/db";
import { addresses } from "@/db/schema";
import { getGeoCoordinates } from "/app/api/getCoordinates"
export const addAddress = async (data: NewAddress) => {
    try {
        // Fetch the geocoded coordinates for the provided address
        const { latitude, longitude } = await getGeoCoordinates(data.addressLine1, data.city, data.state, data.postalCode, data.country);

        // Add the fetched coordinates to the data object
        data.latitude = latitude;
        data.longitude = longitude;

        // Now, save the address along with the coordinates in the database
        return await db.insert(addresses).values(data);
    } catch (error) {
        // Handle any errors, like if geocoding failed or database insertion failed
        console.error("Error adding address:", error);
        throw error;
    }
};
