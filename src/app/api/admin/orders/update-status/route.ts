import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongoose";
// import Order from "@/lib/models/Order";
// import { verifyAdmin } from "@/lib/adminAuth";
import { connectDB } from "../../../../../../lib/mongoose";
import Order from "../../../../../../lib/models/Order";
import { verifyAdmin } from "../../../../../../lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json(
      { error: "Unauthorized admin" },
      { status: 401 }
    );
  }

  await connectDB();

  const { orderId, status } = await req.json();

  const order = await Order.findById(orderId);
  if (!order) {
    return NextResponse.json(
      { error: "Order not found" },
      { status: 404 }
    );
  }

  order.status = status;
  await order.save();

  return NextResponse.json({
    message: "Order status updated",
    order,
  });
}
