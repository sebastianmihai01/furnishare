import rateLimit from "express-rate-limit";
import { config } from "../config/env";

export const rateLimitMiddleware = {
  standard: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later",
  }),

  auth: rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 failed login attempts per hour
    message: "Too many login attempts from this IP, please try again later",
  }),
}; 