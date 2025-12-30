import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongoose";
import User from "../../../../../lib/models/User";
import bcrypt from "bcryptjs"; // Essential for security

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // 1. Basic Presence Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // 2. Email Format Validation (Regex)
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // 3. Password Strength Check
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // 4. Check for Existing User
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    // 5. Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Save User with Hashed Password
    const user = new User({ 
      name: name.trim(), 
      email: email.toLowerCase(), 
      password: hashedPassword 
    });
    
    await user.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );

  } catch (err: any) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" }, // Don't expose raw error messages to users
      { status: 500 }
    );
  }
}