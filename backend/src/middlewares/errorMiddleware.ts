import { Request, Response, NextFunction } from "express";

export interface CustomError extends Error {
  statusCode?: number;
  message: string;
  details?: string;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  console.error(`[Error]: ${message}`, {
    details: err.details || null,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    details: err.details || undefined,
  });
};
