/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const roles = ["admin", "employee", "customer"];

// pending, shipped, delivered, cancelled
export const orderStatus = ["pending", "shipped", "delivered", "cancelled"];
export const ITEMS_PER_PAGE = 10;

export const sjsu_location = { longitude: -121.8832816, latitute: 37.3361726 };
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
