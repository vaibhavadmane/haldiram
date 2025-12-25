import { NextResponse } from "next/server";

import { connectDB } from "../../../../../lib/mongoose";
// import Cart from "@/lib/models/Cart";
// import Product from "@/lib/models/Product";

import { getUserFromToken } from "../../../../../lib/auth";
import Cart from "../../../../../lib/models/Cart";
import Product from "../../../../../lib/models/Product";


export async function POST(req: Request) {
  await connectDB();

  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, quantity } = await req.json();

  const product = await Product.findById(productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  let cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    cart = new Cart({ user: user._id, items: [], totalAmount: 0 });
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price, // 🔐 secure price
    });
  }

  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();

  return NextResponse.json(cart);
}
