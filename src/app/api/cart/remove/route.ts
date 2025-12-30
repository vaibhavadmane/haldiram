import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongoose";
import Cart from "../../../../../lib/models/Cart";
import { getUserFromToken } from "../../../../../lib/auth";

export async function POST(req: Request) {
  await connectDB();

  // ✅ AUTH CHECK
  const user = await getUserFromToken();
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId } = await req.json();

  if (!productId) {
    return NextResponse.json(
      { error: "Product ID required" },
      { status: 400 }
    );
  }

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    return NextResponse.json(
      { error: "Cart not found" },
      { status: 404 }
    );
  }

  // ✅ Remove product
  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  // ✅ Recalculate total
  cart.totalAmount = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  await cart.save();

  return NextResponse.json({
    message: "Item removed from cart",
    cart,
  });
}
