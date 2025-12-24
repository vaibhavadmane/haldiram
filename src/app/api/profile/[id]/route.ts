// src/app/api/profile/[id]/route.ts
import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoose";
// import User from "@/lib/models/User";
import { connectDB } from "../../../../../lib/mongoose";
import User from "../../../../../lib/models/User";
type RouteContext = { params: any };

export async function GET(_: Request, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;   // <<-- IMPORTANT: await params
    const user = await User.findById(id).lean();
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (err: any) {
    console.error("GET /api/profile/[id] error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;   // <<-- await here too
    const body = await req.json();

    if (body.address && typeof body.address === "string") {
      try { body.address = JSON.parse(body.address); } catch { return NextResponse.json({ error: "address must be an object" }, { status: 400 }); }
    }

    const user = await User.findByIdAndUpdate(id, body, { new: true });
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (err: any) {
    console.error("PUT /api/profile/[id] error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE /api/profile/[id] error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
