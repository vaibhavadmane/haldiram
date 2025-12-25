import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "./models/User";
import { connectDB } from "./mongoose";

export async function getUserFromToken() {
  try {
    await connectDB();

    // ✅ FIX: await cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string };

    const user = await User.findById(decoded.userId).select("-password");
    return user || null;
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
