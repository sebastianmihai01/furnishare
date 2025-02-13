import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { userValidation } from "../validations/userValidation";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const router = Router();

// Protected routes - all user routes require authentication
router.use(authMiddleware.authenticate);

router.get("/profile", userController.getProfile);

router.put(
  "/profile",
  uploadMiddleware.single("avatar"),
  validate(userValidation.updateProfile),
  userController.updateProfile
);

router.get("/listings", userController.getUserListings);

export const userRoutes = router; 