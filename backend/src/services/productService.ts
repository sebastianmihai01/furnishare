import { Product } from "../models/Product";
import { ApiError } from "../utils/ApiError";
import { uploadToS3 } from "./awsService";
import { CONSTANTS } from "../config/constants";

export const productService = {
  async getProducts(query: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
  }) {
    const page = query.page || 1;
    const limit = Math.min(
      query.limit || CONSTANTS.PAGINATION.DEFAULT_LIMIT,
      CONSTANTS.PAGINATION.MAX_LIMIT
    );
    const skip = (page - 1) * limit;

    let findQuery: any = {};
    if (query.category) {
      findQuery.category = query.category;
    }
    if (query.search) {
      findQuery.$text = { $search: query.search };
    }

    const products = await Product.find(findQuery)
      .populate("seller", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(findQuery);

    return {
      products,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    };
  },

  async getProductById(id: string) {
    const product = await Product.findById(id).populate("seller", "name email");
    if (!product) {
      throw new ApiError("Product not found", 404);
    }
    return product;
  },

  async createProduct(
    productData: {
      title: string;
      description: string;
      price: number;
      category: string;
      condition: string;
    },
    image: Express.Multer.File,
    sellerId: string
  ) {
    const imageUrl = await uploadToS3(image);

    const product = await Product.create({
      ...productData,
      imageUrl,
      seller: sellerId,
    });

    return product;
  },

  async updateProduct(
    id: string,
    productData: Partial<{
      title: string;
      description: string;
      price: number;
      category: string;
      condition: string;
      status: string;
    }>,
    image?: Express.Multer.File,
    userId: string
  ) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    if (product.seller.toString() !== userId) {
      throw new ApiError("Not authorized", 403);
    }

    if (image) {
      productData.imageUrl = await uploadToS3(image);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    return updatedProduct;
  },

  async deleteProduct(id: string, userId: string) {
    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    if (product.seller.toString() !== userId) {
      throw new ApiError("Not authorized", 403);
    }

    await product.remove();
    return { message: "Product deleted successfully" };
  },
}; 