import { db } from "@/db/db";
import { addresses } from "@/db/schema";
import { eq } from "drizzle-orm";  // Assuming you use 'eq' for equality checks in DB queries
const getGeoCoordinates = async (addressId) => {
  const addressData = await db.select().from(addresses).where(eq(addresses.id, addressId)).first();


  if (!addressData) {
    throw new Error("Address not found");
  }

  const addressString = `${addressData.addressLine1}, ${addressData.city}, ${addressData.state}, ${addressData.postalCode}, ${addressData.country}`;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${apiKey}`);

  
  if (response.status === 200) {
    const data = await response.json();
    const { lat, lng } = data.results[0].geometry.location;
    return { latitude: lat, longitude: lng };
  } else {
    throw new Error("Error fetching coordinates");
  }
// data.results[0].geometry.location;

  // const { lat, lng } = response.data.results[0].geometry.location;
  //   return { latitude: lat, longitude: lng };
  // } else {
  //   throw new Error("Failed to geocode address");
  // }
};
