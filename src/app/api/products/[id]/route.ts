import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/mongoose";
import Product from "../../../../../lib/models/Product";
import mongoose from "mongoose";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // ✅ FIX: await params
  const { id } = await context.params;

  console.log("ID:", id); // ✅ now correct

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const product = await Product.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // ✅ FIX: await params
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid product ID" },
      { status: 400 }
    );
  }

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Product deleted successfully",
  });
}
