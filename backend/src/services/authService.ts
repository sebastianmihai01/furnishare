import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { config } from "../config/env";
import { ApiError } from "../utils/ApiError";
import { CONSTANTS } from "../config/constants";

export const authService = {
  async register(userData: { email: string; password: string; name: string }) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError("Email already registered", 400);
    }

    const user = await User.create(userData);

    const token = this.generateToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  },

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError("Invalid credentials", 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const token = this.generateToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      refreshToken,
    };
  },

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.JWT.REFRESH_SECRET) as {
        id: string;
      };
      const token = this.generateToken(decoded.id);
      return { token };
    } catch (error) {
      throw new ApiError("Invalid refresh token", 401);
    }
  },

  generateToken(userId: string) {
    return jwt.sign({ id: userId }, config.JWT.SECRET, {
      expiresIn: CONSTANTS.AUTH.TOKEN_EXPIRY,
    });
  },

  generateRefreshToken(userId: string) {
    return jwt.sign({ id: userId }, config.JWT.REFRESH_SECRET, {
      expiresIn: CONSTANTS.AUTH.REFRESH_TOKEN_EXPIRY,
    });
  },
};
