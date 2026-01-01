import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: string };

    const { name, phone, gender, address } = await req.json();

    // ✅ Build update object
    const updateData: any = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(gender && { gender }),
    };

    // 🔥 MERGE address fields one by one
    if (address) {
      Object.keys(address).forEach((key) => {
        updateData[`address.${key}`] = address[key];
      });
    }

    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { new: true }
    ).select("-password");

    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
