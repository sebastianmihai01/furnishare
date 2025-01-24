import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  res.json({ token });
};

export const register = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json(user);
};
