import { Router } from "express";
import { cartController } from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { cartValidation } from "../validations/cartValidation";

const router = Router();

// All cart routes require authentication
router.use(authMiddleware.authenticate);

router.get("/", cartController.getCart);

router.post(
  "/add",
  validate(cartValidation.addToCart),
  cartController.addToCart
);

router.delete(
  "/:productId",
  validate(cartValidation.removeFromCart),
  cartController.removeFromCart
);

router.delete("/clear", cartController.clearCart);

export const cartRoutes = router; 