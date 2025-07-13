import type { Express, Request, Response } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertResultSchema } from "@shared/schema";
import { sendNotificationEmail } from "./email";
import { storeEmail } from "./email-storage";

export async function registerRoutes(app: Express) {
  app.get("/api/questions", async (_req, res) => {
    const questions = await storage.getQuestions();
    res.json(questions);
  });

  app.get("/api/types", async (_req, res) => {
    const types = await storage.getTypes();
    res.json(types);
  });

  app.post("/api/results", async (req, res) => {
    const result = insertResultSchema.parse(req.body);
    const saved = await storage.saveResult(result);
    res.json(saved);
  });

  app.get("/api/results/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await storage.getResult(id);
    if (!result) {
      res.status(404).json({ message: "Result not found" });
      return;
    }
    res.json(result);
  });

  app.post("/api/notify", async (req, res) => {
    const { email, resultId } = req.body;
    
    // More comprehensive email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Geldig e-mailadres is vereist" });
    }

    if (!resultId || typeof resultId !== 'number' || resultId <= 0 || !Number.isInteger(resultId)) {
      return res.status(400).json({ message: "Geldig resultaat ID is vereist" });
    }

    // Check if the result exists
    const result = await storage.getResult(resultId);
    if (!result) {
      return res.status(404).json({ message: "Resultaat niet gevonden" });
    }

    // Store email in txt file
    await storeEmail(email, resultId);
    
    // Send notification email
    const success = await sendNotificationEmail({ email, resultId });
    
    if (success) {
      return res.json({ success: true });
    } else {
      // Nog steeds succes terugsturen als de e-mail is opgeslagen maar notificatie mislukt
      return res.json({ success: true, warning: "E-mail opgeslagen, maar notificatie kon niet worden verzonden" });
    }
  });

  return createServer(app);
}
