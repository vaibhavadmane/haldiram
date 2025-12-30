import { connectDB } from "../../../../lib/mongoose";
import Product from "../../../../lib/models/Product";
import Category from "../../../../lib/models/Category"; // 1. YOU MUST IMPORT THE CATEGORY MODEL
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("category");

    // 2. Build the query
    const query = categoryId ? { category: categoryId } : {};

    // 3. Use .populate("category", "name") to get the name field
    const products = await Product.find(query)
      .populate("category", "name") 
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Fetch Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}