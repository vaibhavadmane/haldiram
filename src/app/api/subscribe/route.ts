import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongoose";
import Subscriber from "../../../../lib/models/Subscriber";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { message: "Email already subscribed" },
        { status: 409 }
      );
    }

    const subscriber = await Subscriber.create({ email });

    return NextResponse.json(
      { message: "Subscribed successfully", subscriber },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(subscribers);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
