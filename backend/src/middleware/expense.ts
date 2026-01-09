import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import Expense from "../models/Expense";

declare global {
  namespace Express {
    interface Request {
      expense?: Expense;
    }
  }
}

export const validateExpenseInput = async (
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

export const validateExpenseId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  await param("expenseId")
    .isInt()
    .custom((value) => value > 0)
    .withMessage("Invalid expense ID")
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const validateExpenseExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByPk(expenseId);

    if (!expense) {
      return res.status(404).json({ error: "expense not found" });
    }

    req.expense = expense;

    next();
  } catch (error) {
    res.status(500).json({ error: "error fetching expense" });
  }
};
