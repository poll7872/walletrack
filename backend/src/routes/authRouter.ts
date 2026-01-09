import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";

const router = Router();

router.use(limiter);

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("name is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("email").isEmail().withMessage("invalid email format"),
  handleInputErrors,
  AuthController.createAccount,
);

router.post(
  "/confirm-account",
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("token is not valid"),
  handleInputErrors,
  AuthController.confirmAccount,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
  handleInputErrors,
  AuthController.login,
);

export default router;
