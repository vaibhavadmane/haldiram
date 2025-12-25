import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoose";
import { connectDB } from "../../../../../lib/mongoose";
import Cart from "../../../../../lib/models/Cart";
import Order from "../../../../../lib/models/Order";
import { getUserFromToken } from "../../../../../lib/auth";

export async function POST(req: Request) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await Cart.findOne({ user: user._id });
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const order = new Order({
    user: user._id,
    items: cart.items,
    totalAmount: cart.totalAmount,
    status: "pending",
  });

  await order.save();

  // 🔥 Clear cart after order
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();

  return NextResponse.json({ message: "Order placed", order });
}
