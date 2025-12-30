import { connectDB } from "../../../../../lib/mongoose";
import Product from "../../../../../lib/models/Product";
import Category from "../../../../../lib/models/Category"; // Ensure this is imported
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    const { name, price, description, category, stock, images, netWeight } = data;

    const imagesArray = Array.isArray(images) ? images : [];

    // Basic validation
    if (!name || !price || !category || !netWeight) {
      return NextResponse.json(
        { error: "Missing required fields: Name, Price, Category, and Net Weight are mandatory." },
        { status: 400 }
      );
    }

    if (imagesArray.length === 0) {
      return NextResponse.json(
        { error: "Validation failed: At least one image is required" },
        { status: 400 }
      );
    }

    // 1. Create the product
    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      category, // This is the ID sent from frontend
      stock: Number(stock),
      images: imagesArray,
      netWeight: netWeight.trim()
    });

    // 2. Populate the category name from the Category model
    // This replaces the ID with the full Category object (including 'name')
    const populatedProduct = await Product.findById(newProduct._id).populate("category", "name");

    // 3. Return the product which now contains product.category.name
    return NextResponse.json(populatedProduct, { status: 201 });

  } catch (err: any) {
    console.error("Product Creation API Error:", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e: any) => e.message);
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}