import { Router } from "express";
import { productController } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validationMiddleware";
import { productValidation } from "../validations/productValidation";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";

const router = Router();

// Public routes
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// Protected routes
router.use(authMiddleware.authenticate);

router.post(
  "/",
  uploadMiddleware.single("image"),
  validate(productValidation.createProduct),
  productController.createProduct
);

router.put(
  "/:id",
  uploadMiddleware.single("image"),
  validate(productValidation.updateProduct),
  productController.updateProduct
);

router.delete("/:id", productController.deleteProduct);

export const productRoutes = router; 