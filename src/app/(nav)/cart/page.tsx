"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Heart, Trash2, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Cart Data
  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (res.ok) {
        setCartItems(data.items || []);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update Quantity
  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      if (res.ok) fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  // Remove Item
  const removeItem = async (productId: string) => {
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success("Item removed");
        fetchCart();
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // Calculate Totals
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = subtotal * 0.05; // Assuming 5% GST
  const deliveryCharge = 100;
  const gstOnDelivery = 5;
  const grandTotal = subtotal + gst + deliveryCharge + gstOnDelivery;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#DA0428]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Product List */}
        <div className="flex-1">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif mb-6 tracking-wide uppercase">Product</h2>
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => {
                  const product = item.product;
                  return (
                    <div key={item._id} className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 last:border-0 last:pb-0">
                      <div className="w-32 h-32 relative border rounded-md overflow-hidden bg-white shrink-0">
                        <Image 
                          src={product?.images?.[0] || "/placeholder.png"} 
                          alt={product?.name} 
                          fill 
                          className="object-contain p-2"
                        />
                      </div>
                      
                      <div className="flex-1 w-full">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold text-gray-800 text-lg">{product?.name}</h3>
                            <p className="text-sm text-gray-500">Net Weight : {product?.netWeight}</p>
                          </div>
                          <span className="font-bold text-gray-700">₹{item.price.toFixed(2)}</span>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          {/* Quantity Selector matches image_127e61.png */}
                          <div className="flex items-center bg-[#7F5B98] text-white rounded-md overflow-hidden shadow-sm h-10">
                            <button 
                              onClick={() => updateQuantity(product._id, item.quantity - 1)}
                              className="px-4 hover:bg-black/10 transition-colors"
                            >
                              <Minus size={16} strokeWidth={3} />
                            </button>
                            <span className="px-4 font-bold text-lg select-none">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(product._id, item.quantity + 1)}
                              className="px-4 hover:bg-black/10 transition-colors"
                            >
                              <Plus size={16} strokeWidth={3} />
                            </button>
                          </div>

                          <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-all">
                            <Heart size={20} />
                          </button>
                          
                          <button 
                            onClick={() => removeItem(product._id)}
                            className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all shadow-sm"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Bill Details matches image_14c47d.png */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-xl font-serif mb-8 tracking-wide uppercase">Bill Details</h2>
            
            <div className="space-y-5 text-[15px]">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (Inc. Gst)</span>
                <span className="font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 items-center">
                <span className="flex items-center gap-1.5">
                  GST <Info size={14} className="text-gray-400" />
                </span>
                <span className="font-medium">₹{gst.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600 items-center">
                <span className="flex items-center gap-1.5">
                  GST on Delivery charge <Info size={14} className="text-gray-400" />
                </span>
                <span className="font-medium">₹{gstOnDelivery.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Estimated Delivery Charge</span>
                <span className="font-medium">₹{deliveryCharge.toFixed(2)}</span>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800 tracking-tight">GRAND TOTAL</span>
                  <span className="text-xl font-black text-gray-900 font-sans">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-[#7F5B98] hover:bg-[#6b4c81] text-white py-8 mt-10 rounded-sm font-bold uppercase tracking-[0.1em] text-[13px] shadow-lg transition-all active:scale-[0.98]">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;