// lib/models/User.ts
import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  gender?: string;
  address?: IAddress;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const AddressSchema = new mongoose.Schema<IAddress>(
  {
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: "" },
    gender: { type: String, default: "Male" },
    address: { type: AddressSchema, default: {} },
  },
  { timestamps: true }
);

// Password hashing and comparison logic remains the same...

// 🔐 Hash password
UserSchema.pre("save", async function () {
  const user = this as IUser;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, 10);
});

// 🔑 Compare password
UserSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Prevent model overwrite
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
