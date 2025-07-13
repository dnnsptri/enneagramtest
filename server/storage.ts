import { type Result, type InsertResult } from "@shared/schema";
import { results } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { questions, enneagramTypes } from "./data/questions";
import { type Question, type EnneagramType } from "./data/types";

export interface IStorage {
  getQuestions(): Promise<Question[]>;
  getTypes(): Promise<EnneagramType[]>;
  saveResult(result: InsertResult): Promise<Result>;
  getResult(id: number): Promise<Result | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getQuestions(): Promise<Question[]> {
    // Return questions in their original order
    return questions;
  }

  async getTypes(): Promise<EnneagramType[]> {
    return enneagramTypes;
  }

  async saveResult(insertResult: InsertResult): Promise<Result> {
    // If db is null, throw error to trigger fallback
    if (!db) {
      throw new Error("Database not available");
    }

    // Ensure scores is an array before inserting
    if (!Array.isArray(insertResult.scores)) {
      console.error('Invalid scores format, attempting to convert to array');
      insertResult = {
        ...insertResult,
        scores: Array.isArray(insertResult.scores) ? insertResult.scores : Object.values(insertResult.scores)
      };
    }
    
    try {
      const [result] = await db
        .insert(results)
        .values(insertResult)
        .returning();
      return result;
    } catch (error) {
      console.error('Error saving result to database:', error);
      throw error;
    }
  }

  async getResult(id: number): Promise<Result | undefined> {
    // If db is null, throw error to trigger fallback
    if (!db) {
      throw new Error("Database not available");
    }

    try {
      const [result] = await db
        .select()
        .from(results)
        .where(eq(results.id, id));
      
      return result || undefined;
    } catch (error) {
      console.error('Error fetching result from database:', error);
      throw error;
    }
  }
}

import { MemoryStorage } from "./memory-storage";

// Create both storage implementations
const databaseStorage = new DatabaseStorage();
const memoryStorage = new MemoryStorage();

// Wrapper class that tries database first, falls back to memory
class FallbackStorage implements IStorage {
  async getQuestions(): Promise<Question[]> {
    try {
      return await databaseStorage.getQuestions();
    } catch (error) {
      console.error("Database error, falling back to memory storage for questions:", error);
      return memoryStorage.getQuestions();
    }
  }

  async getTypes(): Promise<EnneagramType[]> {
    try {
      return await databaseStorage.getTypes();
    } catch (error) {
      console.error("Database error, falling back to memory storage for types:", error);
      return memoryStorage.getTypes();
    }
  }

  async saveResult(result: InsertResult): Promise<Result> {
    try {
      return await databaseStorage.saveResult(result);
    } catch (error) {
      console.error("Database error, falling back to memory storage for saving result:", error);
      return memoryStorage.saveResult(result);
    }
  }

  async getResult(id: number): Promise<Result | undefined> {
    try {
      const result = await databaseStorage.getResult(id);
      if (result) return result;
      
      // If not found in database, check memory
      return memoryStorage.getResult(id);
    } catch (error) {
      console.error("Database error, falling back to memory storage for fetching result:", error);
      return memoryStorage.getResult(id);
    }
  }
}

// Export the fallback storage
export const storage = new FallbackStorage();