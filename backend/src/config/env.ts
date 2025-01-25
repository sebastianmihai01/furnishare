import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/app",
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
};

export default config;
