import { db } from "@/db/db";
import { robots } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

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


