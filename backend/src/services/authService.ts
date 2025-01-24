import { User } from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  return jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: "1h" });
};

export const registerUser = async (userData: any) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return User.create({ ...userData, password: hashedPassword });
};
