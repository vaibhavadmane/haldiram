"use client";

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation'; // Added to detect sort changes
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'react-hot-toast';

// Define the Interface based on your API structure
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

export default function ChaiTimePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  // Get the sort value from the URL (e.g., ?sort=price-low)
  const sortType = searchParams.get('sort') || 'position';

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // FILTER: Specifically for Chai Time Snacks
        const filtered = data.filter(
          (item: Product) => item.category?.name === "Chai Time Snacks"
        );
        setProducts(filtered);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load snacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- SORTING LOGIC ---
  // This automatically recalculates whenever products are fetched or the URL sort changes
  const sortedProducts = useMemo(() => {
    const items = [...products];
    
    switch (sortType) {
      case 'price-low':
        return items.sort((a, b) => a.price - b.price);
      case 'price-high':
        return items.sort((a, b) => b.price - a.price);
      case 'newest':
        return items.sort((a, b) => b._id - a._id);
      case 'position':
      default:
        return items; // Default order from API
    }
  }, [products, sortType]);

  if (loading) return <div className="p-10 text-center">Loading snacks...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Chai Time Snacks</h2>
      
      <div className="flex flex-wrap gap-6">
        {sortedProducts.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images?.[0] || '/placeholder.png'
            }} 
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <p className="text-gray-500 mt-4">No items found in this category.</p>
      )}
    </div>
  );
}