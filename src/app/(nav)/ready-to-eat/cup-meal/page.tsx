"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'react-hot-toast';

// 1. Interface to handle the API response and prevent 'never' type errors
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

export default function CupMealsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // 2. FILTER: Matches ' Cup Meals' by trimming whitespace
        const filtered = data.filter(
          (item: Product) => item.category?.name.trim() === "Cup Meals"
        );
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load Cup Meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center text-[#711A2E]">Loading quick meals...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Cup Meals</h2>
      
      <div className="flex flex-wrap gap-6">
        {products.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              // Mapping string _id to id prop
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder-cup.png'
            }} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 mt-4 italic">No cup meals currently available.</p>
      )}
    </div>
  );
}