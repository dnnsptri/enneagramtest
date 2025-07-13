
import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter
const ipRequestMap = new Map<string, { count: number, resetTime: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100; // Max requests per IP per window

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  
  if (!ipRequestMap.has(ip)) {
    ipRequestMap.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return next();
  }
  
  const record = ipRequestMap.get(ip)!;
  
  // Reset if window has expired
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + WINDOW_MS;
    return next();
  }
  
  // Increment and check
  record.count++;
  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({ 
      message: "Te veel verzoeken, probeer het later opnieuw."
    });
  }
  
  next();
}

// Cleanup old records every hour
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestMap.entries()) {
    if (now > record.resetTime) {
      ipRequestMap.delete(ip);
    }
  }
}, 60 * 60 * 1000);
