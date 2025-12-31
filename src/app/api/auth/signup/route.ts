// api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongoose";
import User from "../../../../../lib/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    // 1. Validations
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 2. Check for Existing User
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    // 3. Save User (The Model will hash the password for you)
    const user = new User({ 
      name: name.trim(), 
      email: email.toLowerCase(), 
      password: password // ✅ Pass PLAIN password here
    });
    
    await user.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (err: any) {
    console.error("Signup Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}