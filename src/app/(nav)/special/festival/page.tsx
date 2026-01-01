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

export default function FestivalSavouriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  const sortType = searchParams.get('sort') || 'position';

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // Updated filter to look for Festival Savouries
        const filtered = data.filter(
          (item: Product) => item.category?.name === "India's Favourites"
        );
        setProducts(filtered);
      }
    } catch (error) {
      toast.error("Failed to load festival products");
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

  if (loading) return <div className="p-10 text-center">Loading Festival Specials...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Festival Savouries</h2>
      
      <div className="flex flex-wrap gap-6">
        {sortedProducts.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images[0] || '/placeholder.png'
            }} 
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-gray-500 text-lg">No festival savouries found in this category.</p>
        </div>
      )}
    </div>
  );
}