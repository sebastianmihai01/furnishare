import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { CONSTANTS } from "../config/constants";
import { ApiError } from "../utils/ApiError";

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!CONSTANTS.UPLOAD.ALLOWED_TYPES.includes(file.mimetype)) {
    cb(new ApiError("Invalid file type", 400));
    return;
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: CONSTANTS.UPLOAD.MAX_FILE_SIZE,
  },
});

export const uploadMiddleware = {
  single: (fieldName: string) => upload.single(fieldName),
  array: (fieldName: string, maxCount: number) => upload.array(fieldName, maxCount),
  handleError: (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        next(new ApiError("File too large", 400));
        return;
      }
      next(new ApiError(err.message, 400));
      return;
    }
    next(err);
  },
}; 