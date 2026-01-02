"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Info, Loader2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [step, setStep] = useState<"review" | "place">("review");
  const [isPlacing, setIsPlacing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetch("/api/profile/me");
      if (userRes.ok) setUserData(await userRes.json());

      const cartRes = await fetch("/api/cart");
      if (cartRes.ok) {
        const data = await cartRes.json();
        setCartItems(data.items || []);
      }
    };
    fetchData();
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const gst = subtotal * 0.05; 
  const deliveryCharge = 100.0;
  const gstOnDelivery = 5.0;
  const total = subtotal + gst + deliveryCharge + gstOnDelivery;

  const handlePlaceOrder = async () => {
    if (!userData || !userData.address) {
      toast.error("Shipping details are missing");
      return;
    }
    setIsPlacing(true);
    try {
      const response = await fetch("/api/order/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          phone: userData.phone,
          street: userData.address.street,
          city: userData.address.city,
          state: userData.address.state,
          pincode: userData.address.pincode,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // --- START: CLEAR CART LOGIC ---
        // Option A: If your API supports clearing the whole cart at once (Recommended)
        // await fetch("/api/cart/clear", { method: "DELETE" });

        // Option B: Using your specific "/api/cart/remove" for each item
        const removePromises = cartItems.map((item) =>
          fetch("/api/cart/remove", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId: item.product._id }),
          })
        );
        
        // Wait for all items to be removed from the database
        await Promise.all(removePromises);
        
        // Clear local state
        setCartItems([]); 
        // --- END: CLEAR CART LOGIC ---

        toast.success("Order Placed Successfully!");
        
        // Notify other components (like Header) that the cart is now empty
        window.dispatchEvent(new Event("cart-updated"));
        window.dispatchEvent(new Event("orderPlaced"));
        
        router.push(`/order-success?id=${result.order._id}`);
      } else {
        toast.error(result.error || "Failed to place order");
      }
    } catch (err) {
      toast.error("An error occurred while placing your order");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-16">
      <h1 className="text-[20px] font-serif uppercase tracking-widest text-[#801020] mb-8">Checkout</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          
          {/* Shipping Information [Matches image_74b5f1.png] */}
          <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.05)] relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[22px] font-serif text-[#801020]">Shipping Information</h2>
              <button className="text-[#DA0428] text-[11px] font-bold flex items-center gap-1 hover:underline">
                 <Link href='/profile'> <Edit3 size={12} /> <span className="border-b border-[#DA0428]">Add/Edit</span></Link>
              </button>
            </div>
            {userData && (
              <div className="text-[14px] text-gray-700 space-y-1">
                <p className="font-normal text-gray-500 mb-1">{userData.email}</p>
                <p className="font-medium text-[15px]">{userData.name}</p>
                <p>{userData.phone}</p>
                <p className="pt-3">{userData.address?.street}</p>
                <p className="uppercase">{userData.address?.city}, {userData.address?.state} {userData.address?.pincode} IN</p>
              </div>
            )}
          </div>

          {/* Delivery Charges [Matches image_74b5f1.png] */}
          <div className="bg-white p-6 border border-gray-100 rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
            <h2 className="text-[22px] font-serif text-[#801020] mb-4">Delivery Charges</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Fixed</span>
              <span className="font-bold text-gray-800">₹{deliveryCharge.toFixed(2)}</span>
            </div>
          </div>

      {/* Payment Method Section [Matches image_74b5f1.png & image_759329.png] */}
<div className="bg-white p-6 border border-gray-100 rounded-sm shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
  <h2 className="text-[22px] font-serif text-[#801020] mb-6">Payment Method</h2>
  
  {step === "review" ? (
    <div className="space-y-4 animate-in fade-in duration-300">
      
      {/* ✅ ACTIVE: Cash on Delivery */}
      <label className="flex items-center gap-3 p-4 border border-[#801020] rounded-md cursor-pointer bg-red-50/10">
        <div className="w-5 h-5 rounded-full border-2 border-[#801020] flex items-center justify-center p-0.5">
          <div className="w-full h-full bg-[#801020] rounded-full" />
        </div>
        <span className="font-bold text-gray-800 text-[15px]">Cash on Delivery</span>
      </label>

      {/* Checkbox logic from image_74b5f1.png */}
      <div className="flex items-center gap-2 px-1 py-2">
        <div className="w-4 h-4 border-2 border-[#801020] flex items-center justify-center rounded-sm">
          <div className="w-2 h-2 bg-[#801020]" />
        </div>
        <label className="text-[13px] text-gray-600 font-medium italic">
          Billing address same as shipping address
        </label>
      </div>

      {/* 🚫 DISABLED: Other Methods (Matches the look of image_74b5f1.png but unselectable) */}
      <div className="space-y-4 opacity-40 grayscale pointer-events-none">
        {["UPI", "Wallets", "Debit Cards / Credit Card / Net Banking"].map((method) => (
          <div key={method} className="flex items-center gap-3 p-4 border border-gray-100 rounded-md">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
            <span className="font-bold text-gray-800 text-[15px]">{method}</span>
          </div>
        ))}
      </div>
    </div>
  ) : (
    /* ✅ Step 2: Confirmation View [Matches image_759329.png] */
    <div className="animate-in slide-in-from-top-2 duration-300">
      <p className="text-[16px] font-medium text-gray-800 uppercase tracking-tight">Cash on Delivery</p>
    </div>
  )}
</div>

          <div className="pt-4 flex items-center gap-6">
            <Button 
              onClick={() => step === "review" ? setStep("place") : handlePlaceOrder()}
              disabled={isPlacing}
              className="bg-[#7F5B98] hover:bg-[#6b4c81] text-white px-8 py-2.5 rounded-sm font-bold uppercase tracking-widest text-[12px] shadow-md flex items-center gap-2 h-auto"
            >
              {isPlacing && <Loader2 className="animate-spin h-3 w-3" />}
              {step === "review" ? "Review Order" : "Place Order"}
            </Button>
            {step === "place" && (
              <button onClick={() => setStep("review")} className="text-gray-400 font-bold text-[10px] uppercase hover:underline">Back to Review</button>
            )}
          </div>
        </div>

        {/* Order Summary [Matches image_7540f3.png] */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.08)] sticky top-24">
            <div className="p-4 border-b border-gray-100">
              <p className="text-[10px] font-bold text-[#801020] uppercase tracking-widest mb-3">Order Summary</p>
              <h3 className="text-[14px] font-bold text-gray-800 uppercase tracking-tight">My Cart ({cartItems.length} Items)</h3>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-4 space-y-4 border-b border-gray-100">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <div className="w-16 h-16 border border-gray-100 rounded-sm flex-shrink-0 relative p-1 bg-white">
                    <Image src={item.product?.images?.[0]} alt={item.product?.name} fill className="object-contain" />
                  </div>
                  <div className="text-[12px] flex-1">
                    <p className="font-bold text-gray-800 line-clamp-1">{item.product?.name}</p>
                    <p className="text-gray-400">Net Weight : {item.product?.netWeight || '250 gms'}</p>
                    <p className="text-gray-400 font-medium">Qty : {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 space-y-3 text-[14px]">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal (Inc. Gst)</span>
                <span className="font-bold">₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 items-center">
                <span className="flex items-center gap-1">GST <Info size={12} className="text-gray-400" /></span>
                <span className="font-bold">₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 items-center">
                <span className="flex items-center gap-1 text-[13px]">GST on Delivery charge <Info size={12} className="text-gray-400" /></span>
                <span className="font-bold">₹{gstOnDelivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charge</span>
                <span className="font-bold">₹{deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="text-[16px] font-serif text-[#801020]">Total</span>
                <span className="text-[18px] font-bold text-gray-900">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;