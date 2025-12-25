import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "../../../../../lib/mongoose";
import User from "../../../../../lib/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // 🔥 IMPORTANT PART
  const cookieStore =await cookies(); // ❗ DO NOT await
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",              // 🔑 REQUIRED
    sameSite: "lax",        // 🔑 REQUIRED
    secure: false,          // localhost
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
    },
  });
}
