import axios from 'axios';
/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export const roles = ["admin", "employee", "customer"];

// pending, shipped, delivered, cancelled
export const orderStatus = ["pending", "shipped", "delivered", "cancelled"];
export const ITEMS_PER_PAGE = 10;

export type Location = {
  longitude: number;
  latitude: number;
};

export const ofs_location: Location = {
  longitude: -121.8832816,
  latitude: 37.3361726,
};

export const mission_location = {
  longitude: -121.9827822453428,
  latitute: 37.392667807874886,
};
export const microsoft_location = {
  longitude: -122.06379663983735,
  latitute: 37.41280313687151,
};

export type SearchQueryProps = {
  id?: string;
  query?: string;
  page?: string;
};

export type FormErrorState = {
  errors?: {
    productId?: string[];
    status?: string[];
  };
  message?: string | null;
};

export function getAvatarURL(path: string | null | undefined) {
  if (!path) {
    return "/images/avatars/default.svg";
  } else if (path.includes("http")) return path;
  else return "/" + path;
}

export function getImageUrl(path: string) {
  if (!path) return "/images/products/default.svg";
  else if (path.includes("http")) return path;
  else return "/" + path;
}

export function calculateDistance(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
): number {
  const earthRadius = 6371e3; // Radius of the Earth in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance;
}

export function distance(Location1: Location, Location2: Location): number {
  const earthRadius = 6371e3; // Radius of the Earth in meters
  const phi1 = (Location1.latitude * Math.PI) / 180;
  const phi2 = (Location2.latitude * Math.PI) / 180;
  const deltaPhi = ((Location2.latitude - Location1.latitude) * Math.PI) / 180;
  const deltaLambda =
    ((Location2.longitude - Location1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  return distance; // Distance in meters
}

export type Revenue = {
  month: string;
  revenue: number;
};

export const generateYAxis = (revenue: Revenue[]) => {
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;
  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

// Fariha - 11/18 - Get latitude and longitude for addresses
export const geocode = async (address: string) => {
  try {
    const res =  await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?access_token=${MAPBOX_API_KEY}`
    );

    const relevance = res.data.features[0].relevance;
    if(relevance != 1) {
      return { isValid: false}
    } else {
      const [longitude, latitude] = res.data.features[0].center;
      return { isValid: true, latitude, longitude};
    }
  } catch (error) {
    return { isValid: false, message: error};
  }
}
