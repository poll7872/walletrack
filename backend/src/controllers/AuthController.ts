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
}
