// app/api/admin/category/route.ts
import { connectDB } from "../../../../../lib/mongoose";
import Category from "../../../../../lib/models/Category";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { name, slug, parent } = await req.json();

  const exists = await Category.findOne({ slug });
if (exists) {
  return NextResponse.json(
    { error: "Category already exists" },
    { status: 400 }
  );
}


  const category = await Category.create({
    name,
    slug,
    parent: parent || null
  });

  return NextResponse.json(category, { status: 201 });
}
