import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: process.env.NODE_ENV === "production" ? 10 : 100,
  message: { error: "Too many requests, please try again later." },
});
