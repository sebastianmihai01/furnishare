import { Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";
import { ApiError } from "../utils/ApiError";

export const cartController = {
  // Get user's cart
  getCart: async (req: Request, res: Response) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      select: "title price imageUrl",
    });

    if (!cart) {
      return res.json({ items: [], totalAmount: 0 });
    }

    res.json({
      items: cart.items,
      totalAmount: cart.totalAmount,
    });
  },

  // Add item to cart
  addToCart: async (req: Request, res: Response) => {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = await Cart.create({
        user: req.user.id,
        items: [{ product: productId, quantity }],
        totalAmount: product.price * quantity,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      cart.totalAmount = cart.items.reduce(
        (total, item) => total + item.quantity * product.price,
        0
      );
      await cart.save();
    }

    res.json(cart);
  },

  // Remove item from cart
  removeFromCart: async (req: Request, res: Response) => {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      throw new ApiError("Cart not found", 404);
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    cart.totalAmount = await cart.calculateTotal();
    await cart.save();

    res.json(cart);
  },

  // Clear cart
  clearCart: async (req: Request, res: Response) => {
    await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [], totalAmount: 0 }
    );
    res.json({ message: "Cart cleared" });
  },
}; 