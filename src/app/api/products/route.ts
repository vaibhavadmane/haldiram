// app/api/products/route.ts
import { connectDB } from "../../../../lib/mongoose";
import Product from "../../../../lib/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const products = await Product.find(
    category ? { category } : {}
  );

  return NextResponse.json(products);
}
