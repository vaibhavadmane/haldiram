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

export default function GheeSweetsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // 2. FILTER: Only show items belonging to "Ghee Sweets"
        const filtered = data.filter(
          (item: Product) => item.category?.name === "Ghee Sweets"
        );
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load Ghee Sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Ghee Sweets...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Ghee Sweets</h2>
      
      <div className="flex flex-wrap gap-6">
        {products.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              // Mapping the string _id from your API to the id prop
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder-sweet.png'
            }} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500 mt-4 italic">No items available in Ghee Sweets.</p>
      )}
    </div>
  );
}