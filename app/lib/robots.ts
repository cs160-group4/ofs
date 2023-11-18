import { db } from "@/db/db";
import { robots } from "@/db/schema";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { asc, eq, like, or, sql } from "drizzle-orm";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export type Robot = typeof robots.$inferSelect;
export type NewRobot = typeof robots.$inferInsert;

// get all robots
export const getRobots = async () => {
  return await db.select().from(robots);
};

// get robot by id
export const getRobot = async (id: number) => {
  return await db.select().from(robots).where(eq(robots.id, id));
};

/* get paginated robots */
// get the number of pages
export const getRobotsPages = async (query: string): Promise<number> => {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(robots);
    const count = result[0].count;
    const pages: number = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    return 0;
  }
};
// get filtered robots by page
export const getFilteredRobots = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const result = await db
    .select()
    .from(robots)
    .where(or(
      like(robots.name, `%${query}%`), 
      like(robots.status, `%${query}%`),
      like(robots.currentWeightInLbs, `%${query}%`), 
      )
    )
    .orderBy(asc(robots.id))
    .limit(10)
    .offset(offset);
  return result as Robot[];
};

// add a robot
export const addRobot = async (data: NewRobot) => {
  return await db.insert(robots).values(data);
};

// delete robot
export const deleteRobot = async (id: number) => {
  return await db.delete(robots).where(eq(robots.id, id));
};

// update robot
export const updateRobot = async (id: number, data: NewRobot) => {
  return await db.update(robots).set(data).where(eq(robots.id, id));
};

// update robot with order
// export const updateRobotWithOrder = async (id: number, total_orders: number, total_weight: string) => {
//   return await db.update(robots).set({totalOrders: total_orders, totalWeight: total_weight }).where(eq(robots.id, id));
// };


