import axios from 'axios';
import { db } from "@/db/db";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";  // Assuming you use 'eq' for equality checks in DB queries
const getGeoCoordinates = async (addressId) => {
  // Fetch the address from the database
  const addressData = await db.select().from(addresses).where(eq(addresses.id, addressId)).first();


  if (!addressData) {
    throw new Error("Address not found");
  }

  const addressString = `${addressData.addressLine1}, ${addressData.city}, ${addressData.state}, ${addressData.postalCode}, ${addressData.country}`;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${apiKey}`);

  if (response.data.status === 'OK') {
    const { lat, lng } = response.data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } else {
    throw new Error("Failed to geocode address");
  }
};
