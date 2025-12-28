import { NextRequest, NextResponse } from "next/server";
// import User from "../../../../../lib/models/User";
import { connectDB } from "../../../../../lib/mongoose";
import Order from "../../../../../lib/models/Order";
import { ImPointUp } from "react-icons/im";
// import { verifyAdmin } from "../../../../../lib/adminAuth";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  // if (!verifyAdmin(req)) {
  //   return NextResponse.json(
  //     { error: "Unauthorized admin" },
  //     { status: 401 }
  //   );
  // }

  await connectDB();
console.log("Registered models:", mongoose.modelNames());


  const orders = await Order.find()
      .populate({
      path: "user",
      select: "name  email phone address", // 
    })
    .populate("items.product", "name images")
    .sort({ createdAt: -1 });
console.log("ordrs",orders);

  return NextResponse.json(orders);
}
