"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
// import logo from "../components/images/logo.webp"; // Adjust path to your logo

const OrderSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }

    // Optional: Fetch order details if you have a GET /api/order/[id] endpoint
    const fetchOrderDetails = async () => {
      try {
        // Replace with your actual order fetch API if available
        // const res = await fetch(`/api/order/${orderId}`);
        // if (res.ok) setOrder(await res.json());
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white border rounded-sm shadow-lg p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-[28px] font-serif uppercase tracking-widest text-[#801020] mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for shopping with Haldiram's. Your delicious treats are on the way!
        </p>

        {/* Order Details Box */}
        <div className="bg-gray-50 border rounded-md p-6 mb-8 inline-block w-full text-left">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
              <p className="text-sm font-mono font-bold text-gray-800">{orderId}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
              <p className="text-sm font-bold text-gray-800">Cash On Delivery</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[11px] font-bold rounded-full uppercase">
                Pending Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Helpful Info */}
        <div className="flex items-start gap-4 text-left p-4 bg-blue-50 rounded-md mb-10">
          <Package className="text-blue-600 shrink-0" size={20} />
          <p className="text-sm text-blue-800">
            A confirmation email has been sent to your registered address. You can track your order status in the <strong>Manage Orders</strong> section of your profile.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/profile/orders">
            <Button variant="outline" className="w-full sm:w-auto border-[#7F5B98] text-[#7F5B98] hover:bg-purple-50 px-8 py-6 font-bold uppercase tracking-widest text-xs">
              View My Orders
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto bg-[#7F5B98] hover:bg-[#6b4c81] text-white px-8 py-6 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              Continue Shopping <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Brand */}
      {/* <div className="mt-8 opacity-50">
        <Image src={logo} alt="Haldiram's" width={100} height={40} className="grayscale" />
      </div> */}
    </div>
  );
};

export default OrderSuccessPage;