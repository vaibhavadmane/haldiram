import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(req: Request) {
  const formData = await req.formData();

  // ✅ MUST use getAll
  const files = formData.getAll("images") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "No images received" },
      { status: 400 }
    );
  }

  // ✅ Upload ALL images
  const uploadPromises = files.map(async (file) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result: any) => {
          if (error) reject(error);
          resolve(result.secure_url);
        }
      ).end(buffer);
    });
  });

  const urls = await Promise.all(uploadPromises);

  return NextResponse.json({ urls });
}
