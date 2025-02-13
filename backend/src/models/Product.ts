import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  name: string;
}

const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

export const UserModel = mongoose.model<User>("User", UserSchema);
