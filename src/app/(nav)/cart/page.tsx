"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Minus, Plus, Heart, Trash2, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Local state for instant quantity updates
  const [localQuantities, setLocalQuantities] = useState<{ [key: string]: number }>({});
  
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favLoading, setFavLoading] = useState<string | null>(null);

  // Fetch Cart Data
  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (res.ok) {
        const items = data.items || [];
        setCartItems(items);
        
        // Sync local variable with fetched database values
        const qtyMap: { [key: string]: number } = {};
        items.forEach((item: any) => {
          qtyMap[item.product._id] = item.quantity;
        });
        setLocalQuantities(qtyMap);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      if (res.ok) {
        const data = await res.json();
        const ids = data.products?.map((p: any) => p._id || p) || [];
        setFavorites(ids);
      }
    } catch (err) {
      console.error("Error checking favorites");
    }
  };

  useEffect(() => {
    fetchCart();
    fetchFavorites();
  }, []);

  // Update Quantity using POST (via api/cart/add logic)
  const updateQuantity = async (e: React.MouseEvent, productId: string, currentQty: number, delta: number) => {
    e.stopPropagation();
    const newQty = currentQty + delta;
    if (newQty < 1) return;

    // Optimistic UI update: Update local variable immediately
    setLocalQuantities(prev => ({ ...prev, [productId]: newQty }));

    try {
      // We use POST /api/cart/add and pass delta (1 or -1) as quantity 
      // because your route logic uses: cart.items[itemIndex].quantity += quantity;
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: delta }),
      });
      
      if (res.ok) {
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        fetchCart(); // Revert on error
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      fetchCart(); // Revert on error
      toast.error("Network error");
    }
  };

  // Remove Item using POST
  const removeItem = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success("Item removed");
        fetchCart();
        window.dispatchEvent(new Event("cart-updated"));
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // Toggle Favorite using POST
  const toggleFavorite = async (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (favLoading === productId) return;
    setFavLoading(productId);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        const data = await res.json();
        const updatedIds = data.products?.map((p: any) => p._id || p) || [];
        setFavorites(updatedIds);
        const isAdded = updatedIds.includes(productId);
        toast.success(isAdded ? "Added to favorites" : "Removed from favorites");
        window.dispatchEvent(new Event("favorites-updated"));
      }
    } catch (err) {
      toast.error("Failed to update favorites");
    } finally {
      setFavLoading(null);
    }
  };

  // Calculate Totals using localQuantities
  const subtotal = cartItems.reduce((acc, item) => {
    const currentQty = localQuantities[item.product._id] || item.quantity;
    return acc + (item.price * currentQty);
  }, 0);
  
  const gst = subtotal * 0.05;
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
        
        <div className="flex-1">
          <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif mb-6 tracking-wide uppercase">Product</h2>
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => {
                  const product = item.product;
                  const isFav = favorites.includes(product?._id);
                  const currentDisplayQty = localQuantities[product._id] || item.quantity;

                  return (
                    <div 
                      key={item._id} 
                      onClick={() => router.push(`/cardex/${product._id}`)}
                      className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 last:border-0 last:pb-0 cursor-pointer group hover:bg-gray-50 transition-all p-2 rounded-lg"
                    >
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
                            <h3 className="font-bold text-gray-800 text-lg group-hover:text-[#7F5B98] transition-colors">{product?.name}</h3>
                            <p className="text-sm text-gray-500">Net Weight : {product?.netWeight}</p>
                          </div>
                          <span className="font-bold text-gray-700">₹{(item.price * currentDisplayQty).toFixed(2)}</span>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center bg-[#7F5B98] text-white rounded-md overflow-hidden shadow-sm h-10">
                            <button 
                              onClick={(e) => updateQuantity(e, product._id, currentDisplayQty, -1)}
                              className="px-4 hover:bg-black/10 transition-colors"
                            >
                              <Minus size={16} strokeWidth={3} />
                            </button>
                            <span className="px-4 font-bold text-lg select-none">{currentDisplayQty}</span>
                            <button 
                              onClick={(e) => updateQuantity(e, product._id, currentDisplayQty, 1)}
                              className="px-4 hover:bg-black/10 transition-colors"
                            >
                              <Plus size={16} strokeWidth={3} />
                            </button>
                          </div>

                          <button 
                            onClick={(e) => toggleFavorite(e, product._id)}
                            disabled={favLoading === product?._id}
                            className={`p-2 border rounded-md transition-all ${isFav ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-gray-400 hover:text-red-500"}`}
                          >
                            <Heart size={20} fill={isFav ? "currentColor" : "none"} className={favLoading === product?._id ? "animate-pulse" : ""} />
                          </button>
                          
                          <button 
                            onClick={(e) => removeItem(e, product._id)}
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

            <Link href="/checkout"> 
              <Button className="w-full bg-[#7F5B98] hover:bg-[#6b4c81] text-white py-8 mt-10 rounded-sm font-bold uppercase tracking-[0.1em] text-[13px] shadow-lg transition-all active:scale-[0.98]">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;