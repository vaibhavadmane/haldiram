import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongoose";
import Order from "../../../../../lib/models/Order";
import { getUserFromToken } from "../../../../../lib/auth";

export async function GET() {
  await connectDB();

  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await Order.find({ user: user._id })
    .sort({ createdAt: -1 });

  return NextResponse.json(orders);
}
