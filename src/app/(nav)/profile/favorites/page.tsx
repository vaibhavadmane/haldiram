"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, X, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

const FavoritesPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Favorites Data
  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      if (res.ok) {
        // We assume the API returns { products: [...] }
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // Toggle/Remove Item from Favorites
  const removeItem = async (productId: string) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success("Removed from favorites");
        // Optimistically update the UI by filtering out the removed product
        setProducts(products.filter((p) => p._id !== productId));
        // Notify other components (like a Navbar favorite count)
        window.dispatchEvent(new Event("favorites-updated"));
      }
    } catch (error) {
      toast.error("Failed to remove from favorites");
    }
  };

  // Add Item to Cart
  const addToCart = async (productId: string) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (res.ok) {
        toast.success("Added to cart!");
        // CRITICAL: Notify the rest of the app (Navbar) that the cart has changed
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to add to cart");
      }
    } catch (error) {
      toast.error("An error occurred while adding to cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#DA0428]" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen">
      <h1 className="text-2xl font-serif text-[#002855] mb-2 uppercase tracking-wider">
        Your Favourites
      </h1>
      
      <p className="text-sm text-gray-500 mb-8 border-b pb-4">
        Showing {products.length} {products.length === 1 ? 'item' : 'items'} in this list
      </p>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-sm border border-dashed border-gray-300">
          <p className="text-gray-400 font-medium">Your favorites list is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="group relative bg-white border border-gray-100 rounded-sm hover:shadow-lg transition-all p-4 flex flex-col"
            >
              {/* Remove/Delete Button */}
              <button 
                onClick={() => removeItem(product._id)}
                className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors z-10"
                title="Remove from favorites"
              >
                <X size={20} />
              </button>

              {/* Product Image */}
              <div className="aspect-square relative mb-4 bg-white overflow-hidden flex items-center justify-center">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="text-center flex flex-col flex-grow">
                <h3 className="font-bold text-gray-800 text-sm h-10 line-clamp-2 uppercase leading-tight mb-2">
                  {product.name}
                </h3>
                
                <div className="mt-auto">
                  <p className="text-lg font-black text-[#DA0428] mb-3">
                    ₹{product.price}
                  </p>
                  
                  <button 
                    onClick={() => addToCart(product._id)}
                    className="w-full flex items-center justify-center gap-2 bg-[#7F5B98] text-white py-3 rounded-sm text-[11px] font-bold uppercase tracking-widest hover:bg-[#6b4c81] transition-all active:scale-95 shadow-sm"
                  >
                    <ShoppingCart size={14} strokeWidth={2.5} /> 
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;