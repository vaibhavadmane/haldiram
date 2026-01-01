"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { ProductCard } from '@/components/ProductCard'; // Ensure this path is correct

interface ApiProduct {
  _id: string; 
  name: string;
  price: string | number;
  images: string[];
  category?: {
    name: string;
  };
}

export default function FestivalSection() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. FETCH API LOGIC
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // Filter specifically for "India's Favourites"
        const filtered = data.filter(
          (item: ApiProduct) => item.category?.name === "India's Favourites"
        );
        setProducts(filtered);
      }
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-20">Loading India's Favourites...</div>;

  return (
    <section className="bg-[#FFF5ED] py-10 md:py-16 px-6 md:px-20 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-serif text-[#002855] mb-2">India's Favourites</h1>
          <h2 className="text-[#A52A2A] text-xs md:text-sm font-medium">Serving India Its Favourites In Every Way Possible.</h2>
        </div>
        
        <Link href="/special/festival" className="flex items-center gap-3 group cursor-pointer self-end md:self-auto">
          <h2 className="text-sm font-semibold text-gray-700">View All</h2>
          <div className="bg-[#C8A05B] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
            <MoveRight size={18} />
          </div>
        </Link>
      </div>

      {/* Grid Container using ProductCard Component */}
      <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={{
              id: product._id,
              name: product.name,
              price: product.price.toString(),
              image: product.images[0] || '/placeholder.png'
            }} 
          />
        ))}
      </div>

      {products.length === 0 && !loading && (
        <div className="w-full text-center py-10 text-gray-500">
          No products found in India's Favourites.
        </div>
      )}
    </section>
  );
}