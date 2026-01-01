import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // ✅ Import this
import { connectDB } from "../../../../../lib/mongoose";
import User from "../../../../../lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 1. Create the Token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // 2. Set the Cookie in the browser
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,     // ✅ Prevents JavaScript from reading the cookie (Secure)
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ 
      token,
      message: "Login successful",
      user: { name: user.name, email: user.email } 
    });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}