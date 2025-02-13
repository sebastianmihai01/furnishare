import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  seller: mongoose.Types.ObjectId;
  rating: number;
  category: string;
  condition: "new" | "like-new" | "good" | "fair";
  status: "available" | "sold" | "reserved";
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    category: {
      type: String,
      required: true,
      enum: ["furniture", "decor", "lighting", "storage", "other"],
    },
    condition: {
      type: String,
      required: true,
      enum: ["new", "like-new", "good", "fair"],
    },
    status: {
      type: String,
      required: true,
      enum: ["available", "sold", "reserved"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
ProductSchema.index({ title: "text", description: "text" });

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
