import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, verifyPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
  static createAccount = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      const error = new Error("User already exists");
      return res.status(409).json({ error: error.message });
    }

    try {
      const user = new User(req.body);
      user.password = await hashPassword(password);
      user.token = generateToken();
      await user.save();

      await AuthEmail.sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token,
      });

      res.status(200).json({ message: "Account created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating account" });
    }
  };

  static confirmAccount = async (req: Request, res: Response) => {
    const { token } = req.body;
    const user = await User.findOne({ where: { token } });

    if (!user) {
      const error = new Error("Invalid token");
      return res.status(401).json({ error: error.message });
    }

    user.confirmed = true;
    user.token = "";
    await user.save();

    res.status(200).json({ message: "Account confirmed successfully" });
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("User does not exist");
      return res.status(404).json({ error: error.message });
    }

    if (!user.confirmed) {
      const error = new Error("Account not confirmed");
      return res.status(403).json({ error: error.message });
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      const error = new Error("Incorrect password");
      return res.status(401).json({ error: error.message });
    }

    const token = generateJWT(user.id);

    res.status(200).json(token);
  };

  static forgotPassword = async (req: Request, res: Response) => {
    //Check if user exists
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ error: error.message });
    }

    user.token = generateToken();
    await user.save();

    await AuthEmail.sendPasswordResetToken({
      name: user.name,
      email: user.email,
      token: user.token,
    });

    res.status(200).json({ message: "Password reset email sent" });
  };

  static validateToken = async (req: Request, res: Response) => {
    const { token } = req.body;
    const tokenExists = await User.findOne({ where: { token } });
    if (!tokenExists) {
      const error = new Error("Invalid token");
      return res.status(401).json({ error: error.message });
    }

    res.status(200).json({ message: "Token is valid" });
  };

  static resetPasswordWithToken = async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ where: { token } });
    if (!user) {
      const error = new Error("Invalid token");
      return res.status(401).json({ error: error.message });
    }

    //ASSIGN NEW PASSWORD
    user.password = await hashPassword(password);
    user.token = "";
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  };

  static user = async (req: Request, res: Response) => {
    res.status(200).json(req.user);
  };

  static updateCurrentUserPassword = async (req: Request, res: Response) => {
    const { current_password, password } = req.body;

    if (!req.user) {
      const error = new Error("User not authenticated");
      return res.status(401).json({ error: error.message });
    }

    const { id } = req.user;

    const user = await User.findByPk(id);
    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ error: error.message });
    }

    const isPasswordCorrect = await verifyPassword(
      current_password,
      user.password,
    );
    if (!isPasswordCorrect) {
      const error = new Error("Incorrect password");
      return res.status(401).json({ error: error.message });
    }

    user.password = await hashPassword(password);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  };

  static checkPassword = async (req: Request, res: Response) => {
    const { password } = req.body;
    const { id } = req.user!;

    const user = await User.findByPk(id);

    const isPasswordCorrect = await verifyPassword(password, user!.password);
    if (!isPasswordCorrect) {
      const error = new Error("Incorrect password");
      return res.status(401).json({ error: error.message });
    }

    res.status(200).json({ message: "Password is correct" });
  };
}
