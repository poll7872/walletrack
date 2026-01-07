import { Router } from "express";
import { body, param } from "express-validator";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.get("/", BudgetController.getAll);

router.post(
  "/",
  body("name").notEmpty().withMessage("name is required"),
  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isNumeric()
    .withMessage("amount must be a number")
    .custom((value) => value > 0)
    .withMessage("amount must be greater than zero"),
  handleInputErrors,
  BudgetController.create,
);

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id not valid")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than zero"),
  handleInputErrors,
  BudgetController.getById,
);

router.put(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id not valid")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than zero"),
  body("name").notEmpty().withMessage("name is required"),
  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isNumeric()
    .withMessage("amount must be a number")
    .custom((value) => value > 0)
    .withMessage("amount must be greater than zero"),

  handleInputErrors,
  BudgetController.updateById,
);

router.delete(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id not valid")
    .custom((value) => value > 0)
    .withMessage("Id must be greater than zero"),
  handleInputErrors,
  BudgetController.deleteById,
);

export default router;
