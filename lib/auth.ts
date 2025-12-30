import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "./models/User";

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    // Fetch user from DB to ensure they still exist and token is valid
    return await User.findById(decoded.userId);
  } catch (err) {
    return null;
  }
}