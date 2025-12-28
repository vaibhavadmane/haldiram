import { NextResponse } from "next/server";
import { connectDB } from "../../../../../../lib/mongoose";
import Order from "../../../../../../lib/models/Order";
import mongoose from "mongoose";



export async function GET() {
  try {
    await connectDB();

    const usersWithOrders = await Order.aggregate([
      // 1️⃣ Group orders by user
      {
        $group: {
          _id: "$user",
          totalOrders: { $sum: 1 },
          totalAmountSpent: { $sum: "$totalAmount" },

          totalProducts: {
            $sum: {
              $sum: "$items.quantity"
            }
          },

          orders: {
            $push: {
              orderId: "$_id",
              items: "$items",
              totalAmount: "$totalAmount",
              status: "$status",
              createdAt: "$createdAt"
            }
          }
        }
      },

      // 2️⃣ Join user collection
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      // 3️⃣ Convert user array → object
      { $unwind: "$user" },

      // 4️⃣ Final response shape (ADDRESS INCLUDED)
      {
        $project: {
          _id: 0,
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          phone: "$user.phone",

          address: {
            street: "$user.address.street",
            city: "$user.address.city",
            state: "$user.address.state",
            pincode: "$user.address.pincode"
          },

          totalOrders: 1,
          totalProducts: 1,
          totalAmountSpent: 1,
          orders: 1
        }
      }
    ]);

    return NextResponse.json(usersWithOrders);
  } catch (error) {
    console.error("Admin user orders error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user order details" },
      { status: 500 }
    );
  }
}
