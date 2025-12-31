"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'react-hot-toast';

// 1. Define the Interface to fix 'Property does not exist on type never'
interface Product {
  _id: number;
  name: string;
  price: number;
  images: string[];
  category: {
    name: string;
    _id: string;
  };
}

export default function HeatAndEatPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // 2. FILTER: Using .trim() to handle the leading space in your DB (' Heat and Eat')
        const filtered = data.filter(
          (item: Product) => item.category?.name.trim() === "Heat and Eat"
        );
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading meals...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Heat and Eat</h2>
      
      <div className="flex flex-wrap gap-6">
        {products.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              // p._id is a string from MongoDB. 
              // Ensure ProductCard.tsx interface accepts id: string | number
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder-meal.png'
            }} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 mt-4 italic">No ready-to-eat meals found.</p>
      )}
    </div>
  );
}