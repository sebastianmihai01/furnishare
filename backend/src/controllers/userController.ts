import { Request, Response } from "express";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { Product } from "../models/Product";

export const userController = {
  // Get user profile
  getProfile: async (req: Request, res: Response) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    res.json(user);
  },

  // Update user profile
  updateProfile: async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError("Email already in use", 400);
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;

    const updatedUser = await user.save();
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  },

  // Get user's listings
  getUserListings: async (req: Request, res: Response) => {
    const products = await Product.find({ seller: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(products);
  },
};
