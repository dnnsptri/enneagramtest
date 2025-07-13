import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  scores: json("scores").notNull().$type<number[]>(),
  primaryType: integer("primary_type").notNull(),
  secondaryType: integer("secondary_type").notNull(),
  tertiaryType: integer("tertiary_type").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertResultSchema = createInsertSchema(results);

export type InsertResult = z.infer<typeof insertResultSchema>;
export type Result = typeof results.$inferSelect;

export const answerSchema = z.object({
  questionId: z.number(),
  answer: z.number().min(0).max(2)
});

export type Answer = z.infer<typeof answerSchema>;
