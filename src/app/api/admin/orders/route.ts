import { NextRequest, NextResponse } from "next/server";
// import User from "../../../../../lib/models/User";
import { connectDB } from "../../../../../lib/mongoose";
import Order from "../../../../../lib/models/Order";
import Product from "../../../../../lib/models/Product";
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

const products = await Product.find()
      .populate("category", "name") // This swaps the ID for the category Name
      .sort({ createdAt: -1 });
// console.log("products",products);
  const orders = await Order.find()
      .populate({
      path: "user",
      select: "name  email phone address", // 
    })
    
    .populate("items.product", "name images")
    .sort({ createdAt: -1 });


  return NextResponse.json({orders,products});
}
