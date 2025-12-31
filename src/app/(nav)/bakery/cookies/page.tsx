"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'react-hot-toast';

// 1. Interface matching your MongoDB object structure
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

export default function CookiesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // 2. FILTER: Only show items belonging to "Cookies"
        // Using .trim() because your API data showed a space: ' Cookies'
        const filtered = data.filter(
          (item: Product) => item.category?.name.trim() === "Cookies"
        );
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load Cookies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Cookies...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Cookies</h2>
      
      <div className="flex flex-wrap gap-6">
        {products.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              // Mapping the string _id from your API to the id prop
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder-cookie.png'
            }} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 mt-4 italic">No cookies available at the moment.</p>
      )}
    </div>
  );
}