import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose";
import Favorite from "../../../../lib/models/Favorite";
import { getUserFromToken } from "../../../../lib/auth";

export async function GET() {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Populating product details so the frontend can display images and names
  const favorite = await Favorite.findOne({ user: user._id }).populate("products");
  return NextResponse.json(favorite || { products: [] });
}

export async function POST(req: Request) {
  await connectDB();
  const user = await getUserFromToken();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { productId } = await req.json();

  // 1. Find the user's favorite document
  let favorite = await Favorite.findOne({ user: user._id });

  if (!favorite) {
    // Create new document if it doesn't exist
    favorite = new Favorite({ user: user._id, products: [productId] });
  } else {
    // 2. Check if product exists in array (convert ObjectId to string for reliable check)
    const productExists = favorite.products.some(
      (id) => id.toString() === productId
    );

    if (productExists) {
      // Remove product (Pull)
      favorite.products = favorite.products.filter(
        (id) => id.toString() !== productId
      ) as any;
    } else {
      // Add product (Push)
      favorite.products.push(productId as any);
    }
  }

  await favorite.save();
  // Return the updated list populated so the UI updates instantly
  const updatedFavorite = await favorite.populate("products");
  
  return NextResponse.json(updatedFavorite);
}