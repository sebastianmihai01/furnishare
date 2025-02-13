import { User } from "../models/User";
import { Product } from "../models/Product";
import { ApiError } from "../utils/ApiError";
import { uploadToS3 } from "./awsService";

export const userService = {
  async getProfile(userId: string) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  },

  async updateProfile(
    userId: string,
    userData: {
      name?: string;
      email?: string;
    },
    avatar?: Express.Multer.File
  ) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (userData.email && userData.email !== user.email) {
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new ApiError("Email already in use", 400);
      }
    }

    if (avatar) {
      userData.avatar = await uploadToS3(avatar);
    }

    Object.assign(user, userData);
    await user.save();

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  },

  async getUserListings(userId: string) {
    const products = await Product.find({ seller: userId }).sort({
      createdAt: -1,
    });
    return products;
  },
}; 