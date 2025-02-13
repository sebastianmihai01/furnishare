import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = {
  authenticate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      
      if (!token) {
        throw new ApiError("No token provided", 401);
      }

      const decoded = jwt.verify(token, config.JWT.SECRET) as { id: string };
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        throw new ApiError("User not found", 401);
      }

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new ApiError("Invalid token", 401));
      } else {
        next(error);
      }
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.body.refreshToken;
      
      if (!refreshToken) {
        throw new ApiError("No refresh token provided", 401);
      }

      const decoded = jwt.verify(refreshToken, config.JWT.REFRESH_SECRET) as { id: string };
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        throw new ApiError("User not found", 401);
      }

      const newToken = jwt.sign({ id: user._id }, config.JWT.SECRET, {
        expiresIn: "1h",
      });

      res.json({ token: newToken });
    } catch (error) {
      next(error);
    }
  },
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
