import { Router } from "express";
import { orderController } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { orderValidation } from "../validations/orderValidation";

const router = Router();

// All order routes require authentication
router.use(authMiddleware.authenticate);

router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);

router.post(
  "/",
  validate(orderValidation.createOrder),
  orderController.createOrder
);

router.put(
  "/:id/status",
  validate(orderValidation.updateOrderStatus),
  orderController.updateOrderStatus
);

router.put(
  "/:id/cancel",
  validate(orderValidation.cancelOrder),
  orderController.cancelOrder
);

export const orderRoutes = router; 