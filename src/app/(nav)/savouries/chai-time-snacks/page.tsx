import React from 'react';
import { ProductCard } from '@/components/ProductCard';

// Define the products specific to Chai Time Snacks
const products = [
  { 
    id: 201, 
    name: "Achari Mathi", 
    price: "120.00", 
    image: "/images/mathi-achari.png" 
  },
  { 
    id: 202, 
    name: "Gol Mathi Traditional", 
    price: "110.00", 
    image: "/images/mathi-traditional.png" 
  },
  { 
    id: 203, 
    name: "Mini Samosa", 
    price: "95.00", 
    image: "/images/mini-samosa.png" 
  },
  { 
    id: 204, 
    name: "Kachori Snack", 
    price: "95.00", 
    image: "/images/kachori.png" 
  },
  { 
    id: 205, 
    name: "Suvali", 
    price: "105.00", 
    image: "/images/suvali.png" 
  },
  { 
    id: 206, 
    name: "Fan Puff", 
    price: "80.00", 
    image: "/images/fan-puff.png" 
  },
];

const ChaiTimeSnacksPage = () => {
  return (
    <>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif text-[#711A2E]">Chai Time Snacks</h2>
      
      </div>

      {/* Product Grid */}
      <div className="w-full flex flex-wrap gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ChaiTimeSnacksPage;