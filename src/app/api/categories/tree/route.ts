// app/api/categories/tree/route.ts
import Category from "../../../../../lib/models/Category";
import { connectDB } from "../../../../../lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const categories = await Category.find();

  const map: any = {};
  categories.forEach(cat => {
    map[cat._id] = { ...cat._doc, children: [] };
  });

  const tree: any[] = [];
  categories.forEach(cat => {
    if (cat.parent) {
      map[cat.parent]?.children.push(map[cat._id]);
    } else {
      tree.push(map[cat._id]);
    }
  });

  return NextResponse.json(tree);
}
