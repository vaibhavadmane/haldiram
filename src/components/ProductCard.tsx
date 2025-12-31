"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import cardTop from '@/components/images/cardtop.png';
import cardBottom from '@/components/images/cardbottom.png';

interface Product {
  id: string | number;
  name: string;
  price: string;
  image: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const [qty, setQty] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const addToCart = async (e: React.MouseEvent, quantity: number) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    // If quantity hits 0, just reset state
    if (quantity < 0) return;

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity }),
      });
      if (res.ok) {
        setQty(quantity);
        toast.success(quantity > 0 ? "Cart updated!" : "Removed from cart");
      }
    } catch (err) {
      toast.error("Failed to update cart");
    }
  };

  return (
    <div className="relative w-[245px] h-[360px] group flex flex-col bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
      
      {/* Decorative Borders - pointer-events-none ensures they don't block clicks */}
      <div className="absolute top-4 bottom-4 left-0 w-[4px] flex justify-between z-10 pointer-events-none">
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
      </div>
      <div className="absolute top-4 bottom-4 right-0 w-[4px] flex justify-between z-10 pointer-events-none">
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
      </div>
      
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
        <Image src={cardTop} alt="" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none">
        <Image src={cardBottom} alt="" className="w-full h-auto" />
      </div>

      {/* Content Area */}
      <div className="relative z-30 py-8 px-4 flex flex-col h-full">
        
        {/* CLICKABLE AREA: IMAGE AND NAME */}
        <Link href={`/cardex/${product.id}`} className="flex-grow flex flex-col cursor-pointer">
          <div className="flex-grow flex items-center justify-center pt-4">
            <div className="relative w-32 h-32 transition-transform duration-300 group-hover:scale-110">
              <Image src={product.image} alt={product.name} fill className="object-contain" />
            </div>
          </div>

          <h2 className="mt-4 text-sm font-bold text-gray-800 h-10 overflow-hidden leading-tight hover:text-[#922367] transition-colors">
            {product.name}
          </h2>
        </Link>

        {/* NON-CLICKABLE AREA: PRICE AND BUTTONS */}
        <div className="mt-2">
          <div className="flex justify-between items-center h-10">
            <h2 className="text-sm font-bold text-gray-900">
              ₹{product.price} <span className="text-[9px] text-gray-500 font-normal ml-1">Inc. GST</span>
            </h2>
            
            <div className='flex gap-2'>
              {qty === 0 ? (
                <button 
                  onClick={(e) => addToCart(e, 1)} 
                  className="border border-[#7C5A9F] text-[#7C5A9F] w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#7C5A9F] hover:text-white transition-all"
                >
                  <Plus size={18} />
                </button>
              ) : (
                <div className="bg-[#8E6A94] text-white flex items-center justify-between px-2 w-20 h-8 rounded-lg">
                  <button onClick={(e) => addToCart(e, qty - 1)} className="hover:scale-110"><Minus size={14} /></button>
                  <span className="font-bold text-sm">{qty}</span>
                  <button onClick={(e) => addToCart(e, qty + 1)} className="hover:scale-110"><Plus size={14} /></button>
                </div>
              )}
              <button 
                onClick={(e) => { 
                  e.preventDefault(); 
                  e.stopPropagation(); 
                  setIsFavorite(!isFavorite); 
                }} 
                className={`border w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isFavorite ? 'bg-[#711A2E] text-white border-[#711A2E]' : 'text-[#711A2E] border-gray-200'}`}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};