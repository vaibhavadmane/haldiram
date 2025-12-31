"use client";

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'react-hot-toast';

// Define the shape of your API data
interface Product {
  _id:  number;
  name: string;
  price: number;
  images: string[];
  category: {
    name: string;
    _id: string;
  };
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // FILTER: Only keep products where category is "Healthy Snacking"
        const filtered = data.filter(
          (item: Product) => item.category?.name === "Healthy Snacking"
        );
        setProducts(filtered);
      }
    } catch (error) {
      toast.error("Failed to load snacks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Healthy Snacking</h2>
      
      <div className="flex flex-wrap gap-6">
        {products.map((p) => (
          <ProductCard 
            key={p._id} 
            product={{
              // If you cannot change ProductCard.tsx to accept strings, 
              // use: id: Math.random(), but it's better to update the component!
              id: p._id, 
              name: p.name,
              price: p.price.toString(),
              image: p.images[0] || '/placeholder.png'
            }} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-gray-500">No healthy snacks available right now.</p>
      )}
    </div>
  );
}