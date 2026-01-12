import { Request, Response } from "express";
import Budget from "../models/Budget";
import Expense from "../models/Expense";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        where: {
          userId: req.user?.id,
        },
      });
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ error: "error fetching budgets" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);
      budget.userId = req.user?.id;
      await budget.save();
      res.status(201).json({ message: "budget created successfully", budget });
    } catch (error) {
      res.status(500).json({ error: "error creating budget" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const budget = await Budget.findByPk(req.budget?.id, {
      include: [Expense],
    });

    res.status(200).json(budget);
  };

  static updateById = async (req: Request, res: Response) => {
    await req.budget!.update(req.body);
    res.status(200).json({ message: "budget updated successfully" });
  };

  static deleteById = async (req: Request, res: Response) => {
    await req.budget!.destroy();
    res.status(200).json({ message: "budget deleted successfully" });
  };
}
