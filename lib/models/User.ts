import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs"; // ✅ NOT bcrypt

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

const AddressSchema = new mongoose.Schema<IAddress>({
  street: String,
  city: String,
  state: String,
  pincode: String,
});

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    gender: String,
    address: { type: AddressSchema, default: {} },
  },
  { timestamps: true }
);

// 🔐 Hash password before save (CORRECT)
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

// Avoid model overwrite during hot reloads
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
