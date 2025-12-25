import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "../../../../../lib/mongoose";
import Order from "../../../../../lib/models/Order";
// import { verifyAdmin } from "../../../../../lib/adminAuth";

export async function GET(req: NextRequest) {
  // if (!verifyAdmin(req)) {
  //   return NextResponse.json(
  //     { error: "Unauthorized admin" },
  //     { status: 401 }
  //   );
  // }

  await connectDB();

  const orders = await Order.find()
    // .populate("user", "name phone")
    .populate("items.product", "name images")
    .sort({ createdAt: -1 });

  return NextResponse.json(orders);
}
