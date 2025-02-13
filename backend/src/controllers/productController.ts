import { Request, Response } from "express";
import { Product } from "../models/Product";
import { ApiError } from "../utils/ApiError";

export const productController = {
  // Get all products with pagination
  getProducts: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate("seller", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments();

    res.json({
      products,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    });
  },

  // Get single product by ID
  getProductById: async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    res.json(product);
  },

  // Create new product
  createProduct: async (req: Request, res: Response) => {
    const { title, description, price, imageUrl } = req.body;
    const product = await Product.create({
      title,
      description,
      price,
      imageUrl,
      seller: req.user.id, // From auth middleware
    });

    res.status(201).json(product);
  },

  // Update product
  updateProduct: async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    if (product.seller.toString() !== req.user.id) {
      throw new ApiError("Not authorized", 403);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  },

  // Delete product
  deleteProduct: async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    if (product.seller.toString() !== req.user.id) {
      throw new ApiError("Not authorized", 403);
    }

    await product.remove();
    res.json({ message: "Product removed" });
  },
};
