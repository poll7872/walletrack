import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
  namespace Express {
    interface Request {
      budget?: Budget;
    }
  }
}

export const validateBudgetId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await param("budgetId")
    .isInt()
    .custom((value) => value > 0)
    .withMessage("Invalid budget ID")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateBudgetExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { budgetId } = req.params;
    const budget = await Budget.findByPk(budgetId);

    if (!budget) {
      return res.status(404).json({ error: "budget not found" });
    }

    req.budget = budget;

    next();
  } catch (error) {
    res.status(500).json({ error: "error fetching budget" });
  }
};

export const validateBudgetInput = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await body("name").notEmpty().withMessage("name is required").run(req);
  await body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isNumeric()
    .withMessage("amount must be a number")
    .custom((value) => value > 0)
    .withMessage("amount must be greater than zero")
    .run(req);

  next();
};
