import { Router } from "express";
import { authController } from "../controllers/authController";
import { validate } from "../middlewares/validationMiddleware";
import { authValidation } from "../validations/authValidation";
import { rateLimitMiddleware } from "../middlewares/rateLimitMiddleware";

const router = Router();

router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

router.post(
  "/login",
  rateLimitMiddleware.auth,
  validate(authValidation.login),
  authController.login
);

router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

export const authRoutes = router;
