import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
require("dotenv").config();

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] || req.body.token;
  if (!token)
    return res.status(403).send("A token is required for authentication");

  try {
    const verifiedJWT = jwt.verify(token, process.env.KEY!);
    req.user = verifiedJWT;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  // all good!
  return next();
};

module.exports = verifyToken;
