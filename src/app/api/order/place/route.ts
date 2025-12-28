import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoose";
import { connectDB } from "../../../../../lib/mongoose";
import Cart from "../../../../../lib/models/Cart";
import Order from "../../../../../lib/models/Order";
import { getUserFromToken } from "../../../../../lib/auth";

                                    

export async function POST(req: Request) {
  await connectDB();

  // 🔐 Auth
  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 🛒 Cart check
  const cart = await Cart.findOne({ user: user._id });
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  // 📦 Read shipping details
  const { name, phone, street, city, state, pincode } = await req.json();

  if (!name || !phone || !street || !city || !state || !pincode) {
    return NextResponse.json(
      { error: "All shipping details are required" },
      { status: 400 }
    );
  }

  // 🧾 Create order
  const order = new Order({
    user: user._id,
    items: cart.items,
    shippingAddress: {
      name,
      phone,
      street,
      city,
      state,
      pincode,
    },
    totalAmount: cart.totalAmount,
    status: "pending",
  });

  await order.save();

  // 🔥 Clear cart
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();

  return NextResponse.json(
    { message: "Order placed successfully", order },
    { status: 201 }
  );
}
