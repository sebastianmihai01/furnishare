import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import Logger from "../config/logger";

export const errorMiddleware = {
  notFound: (req: Request, res: Response, next: NextFunction) => {
    const error = new ApiError(`Not Found - ${req.originalUrl}`, 404);
    next(error);
  },

  errorHandler: (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    Logger.error(`Error: ${message}`, {
      url: req.originalUrl,
      method: req.method,
      statusCode,
      stack: err.stack,
    });

    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  },
};
