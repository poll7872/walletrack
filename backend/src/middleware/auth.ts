import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    return res.status(401).json({ error: "Token not valid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({ error: "Token not valid" });
    }

    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email"],
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token not valid" });
  }
};
