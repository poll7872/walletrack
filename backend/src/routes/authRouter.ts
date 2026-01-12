import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(limiter);

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("name is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password not valid min 8 characters"),
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

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("invalid email format"),
  handleInputErrors,
  AuthController.forgotPassword,
);

router.post(
  "/validate-token",
  body("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("token is not valid"),
  handleInputErrors,
  AuthController.validateToken,
);

router.post(
  "/reset-password/:token",
  param("token")
    .notEmpty()
    .isLength({ min: 6, max: 6 })
    .withMessage("token is not valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password is not valid min 8 characters"),
  handleInputErrors,
  AuthController.resetPasswordWithToken,
);

router.get("/user", authenticate, AuthController.user);

router.post(
  "/update-password",
  body("current_password")
    .notEmpty()
    .withMessage("Current password is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("new password is not valid min 8 characters"),
  handleInputErrors,
  authenticate,
  AuthController.updateCurrentUserPassword,
);

router.post(
  "/check-password",
  body("password").notEmpty().withMessage("password is required"),
  handleInputErrors,
  authenticate,
  AuthController.checkPassword,
);

export default router;
