// lib/models/User.ts
import mongoose, { Document, Model } from "mongoose";

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface IUser extends Document {
  name: string;
  email?: string;
  phone?: string;
  gender?: string;
  address?: IAddress;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new mongoose.Schema<IAddress>({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
});

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, index: true, unique: false },
    phone: { type: String, index: true, unique: false },
    gender: { type: String },
    address: { type: AddressSchema, default: {} },
  },
  { timestamps: true }
);

// Avoid model overwrite during hot reloads
const User: Model<IUser> = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;
