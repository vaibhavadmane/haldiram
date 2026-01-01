"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'react-hot-toast';

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

export default function DryFruitsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const sortType = searchParams.get('sort') || 'position';

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // FILTER: Using .trim() to match ' Dry Fruits'
        const filtered = data.filter(
          (item: Product) => item.category?.name.trim() === "Dry Fruits"
        );
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load Dry Fruits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const items = [...products];
    switch (sortType) {
      case 'price-low':
        return items.sort((a, b) => a.price - b.price);
      case 'price-high':
        return items.sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  }, [products, sortType]);

  if (loading) return <div className="p-10 text-center text-[#711A2E]">Loading Dry Fruits...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Dry Fruits</h2>
      
      <div className="flex flex-wrap gap-6">
        {sortedProducts.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder-dryfruit.png'
            }} 
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="text-gray-500 mt-4 italic">Currently no premium dry fruits in stock.</p>
      )}
    </div>
  );
}