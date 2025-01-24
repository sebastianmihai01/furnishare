import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Error Handling
app.use(errorMiddleware);

export default app;
