import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoose";
import { connectDB } from "../../../../lib/mongoose";

import Cart from "../../../../lib/models/Cart";
// import { getUserFromToken } from "@/lib/auth";
import { getUserFromToken } from "../../../../lib/auth";

export async function GET(req: Request) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await Cart.findOne({ user: user._id }).populate("items.product");

  return NextResponse.json(cart || { items: [], totalAmount: 0 });
}
