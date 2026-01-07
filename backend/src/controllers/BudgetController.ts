import { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        //TODO: Filter by userId when authentication is implemented
      });
      res.status(200).json(budgets);
    } catch (error) {
      res.status(500).json({ error: "error fetching budgets" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);
      await budget.save();
      res.status(201).json({ message: "budget created successfully", budget });
    } catch (error) {
      res.status(500).json({ error: "error creating budget" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const budget = await Budget.findByPk(id);

      if (!budget) {
        return res.status(404).json({ error: "budget not found" });
      }

      res.status(200).json(budget);
    } catch (error) {
      res.status(500).json({ error: "error fetching budget" });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const budget = await Budget.findByPk(id);

      if (!budget) {
        return res.status(404).json({ error: "budget not found" });
      }

      await budget.update(req.body);
      res.status(200).json({ message: "budget updated successfully", budget });
    } catch (error) {
      res.status(500).json({ error: "error fetching budget" });
    }
  };

  static deleteById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const budget = await Budget.findByPk(id);

      if (!budget) {
        return res.status(404).json({ error: "budget not found" });
      }

      await budget.destroy();
      res.status(200).json({ message: "budget deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "error deleting budget" });
    }
  };
}
