import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../../../lib/mongoose";
import User from "../../../../lib/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const { name, phone, gender, address } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(gender && { gender }),
        ...(address && { address })
      },
      { new: true }
    ).select("-password");

    return NextResponse.json(updatedUser);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);

    const user = await User.findById(decoded.userId).select("-password");

    return NextResponse.json(user);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
