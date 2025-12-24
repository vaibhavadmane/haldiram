// src/app/api/profile/route.ts
import { NextResponse } from "next/server";

import { connectDB } from "../../../../lib/mongoose";

import User from "../../../../lib/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, email, phone, gender, address } = body;
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

    const user = new User({ name, email, phone, gender, address });
    await user.save();
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/profile error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await User.find().sort({ createdAt: -1 }).limit(100);
    return NextResponse.json(users);
  } catch (err: any) {
    console.error("GET /api/profile error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
