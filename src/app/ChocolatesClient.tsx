"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { toast } from "react-hot-toast";

interface Product {
  _id: number;
  name: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
}

export default function ChocolatesClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  const sortType = searchParams.get("sort") || "position";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(
          data.filter(
            (item: Product) =>
              item.category?.name.trim() === "Chocolates & Confectionary"
          )
        );
      } catch {
        toast.error("Failed to load chocolates");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const items = [...products];
    if (sortType === "price-low") return items.sort((a, b) => a.price - b.price);
    if (sortType === "price-high") return items.sort((a, b) => b.price - a.price);
    return items;
  }, [products, sortType]);

  if (loading) return <div className="p-10 text-center">Loading treats...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">
        Chocolates & Confectionary
      </h2>

      <div className="flex flex-wrap gap-6">
        {sortedProducts.map((p) => (
          <ProductCard
            key={p._id}
            product={{
              id: p._id,
              name: p.name,
              price: p.price.toString(),
              image: p.images?.[0] || "/placeholder.png",
            }}
          />
        ))}
      </div>
    </div>
  );
}
