import { Router } from "express";
import { authRoutes } from "./authRoutes";
import { productRoutes } from "./productRoutes";
import { userRoutes } from "./userRoutes";
import { cartRoutes } from "./cartRoutes";
import { orderRoutes } from "./orderRoutes";
import { CONSTANTS } from "../config/constants";

const router = Router();
const apiPrefix = CONSTANTS.API.PREFIX;

// Mount routes
router.use(`${apiPrefix}/auth`, authRoutes);
router.use(`${apiPrefix}/products`, productRoutes);
router.use(`${apiPrefix}/users`, userRoutes);
router.use(`${apiPrefix}/cart`, cartRoutes);
router.use(`${apiPrefix}/orders`, orderRoutes);

export default router; 