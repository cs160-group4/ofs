import { db } from "@/db/db";
import { robots } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export type Robot = typeof robots.$inferSelect;

export const getRobots = async () => {
  return await db.select().from(robots);
};

