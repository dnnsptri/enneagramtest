
import { type Result, type InsertResult } from "@shared/schema";
import { questions, enneagramTypes } from "./data/questions";
import { type Question, type EnneagramType } from "./data/types";
import { IStorage } from "./storage";

export class MemoryStorage implements IStorage {
  private results: Result[] = [];
  private nextId = 1;

  async getQuestions(): Promise<Question[]> {
    return questions;
  }

  async getTypes(): Promise<EnneagramType[]> {
    return enneagramTypes;
  }

  async saveResult(insertResult: InsertResult): Promise<Result> {
    // Ensure scores is an array before inserting
    if (!Array.isArray(insertResult.scores)) {
      console.log('Converting scores to array');
      insertResult = {
        ...insertResult,
        scores: Array.isArray(insertResult.scores) ? insertResult.scores : Object.values(insertResult.scores)
      };
    }
    
    // Create new result with ID
    const result: Result = {
      ...insertResult,
      id: this.nextId++
    };
    
    // Store in memory
    this.results.push(result);
    console.log(`Saved result with ID: ${result.id} to memory storage`);
    
    return result;
  }

  async getResult(id: number): Promise<Result | undefined> {
    console.log(`Looking for result with ID: ${id} in memory storage`);
    return this.results.find(r => r.id === id);
  }
}
