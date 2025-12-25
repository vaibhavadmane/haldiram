// app/api/admin/product/route.ts
import { connectDB } from "../../../../../lib/mongoose";
import Product from "../../../../../lib/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const product = await Product.create(data);
  return NextResponse.json(product, { status: 201 });
}
