import mongoose from "mongoose";
import { config } from "../config/env";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.dbUrl);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};
