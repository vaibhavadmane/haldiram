import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongoose";
import Order from "../../../../../../lib/models/Order";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "orderId and status are required" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // ✅ no full validation
    );

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error: any) {
    console.error("Update order status error:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
