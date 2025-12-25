import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";


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

// 🔐 Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔑 Compare password method
UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Avoid model overwrite during hot reloads
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
