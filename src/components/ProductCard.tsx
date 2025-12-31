"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, Heart } from 'lucide-react';
import cardTop from '@/components/images/cardtop.png';
import cardBottom from '@/components/images/cardbottom.png';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

export const ProductCard = ({ product }: { product: Product }) => {
  const [qty, setQty] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative w-[245px] h-[360px] group flex flex-col bg-white">
      {/* Decorative Borders */}
      <div className="absolute top-4 bottom-4 left-0 w-[4px] flex justify-between z-10">
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
      </div>
      <div className="absolute top-4 bottom-4 right-0 w-[4px] flex justify-between z-10">
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
        <div className="w-[1px] h-full bg-[#CD9951]/60" />
      </div>
      <div className="absolute top-0 left-0 w-full z-20">
        <Image src={cardTop} alt="" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-0 left-0 w-full z-20">
        <Image src={cardBottom} alt="" className="w-full h-auto" />
      </div>

      {/* Content */}
      <div className="relative z-30 py-8 px-2 flex flex-col h-full">
        <div className="flex-grow flex items-center justify-center pt-4">
          <div className="relative w-32 h-32 transition-transform duration-300 group-hover:scale-110">
            <Image src={product.image} alt={product.name} fill className="object-contain" />
          </div>
        </div>

        <div className="mt-auto">
          <h2 className="text-sm font-bold text-gray-800 mb-2 h-10 overflow-hidden leading-tight">
            {product.name}
          </h2>
          <div className="flex justify-between items-center h-10">
            <h2 className="text-sm font-bold text-gray-900">
              ₹{product.price} <span className="text-[9px] text-gray-500 font-normal ml-1">Inc. GST</span>
            </h2>
            <div className='flex gap-2'>
              {qty === 0 ? (
                <button onClick={() => setQty(1)} className="border border-[#7C5A9F] text-[#7C5A9F] w-8 h-8 rounded-md flex items-center justify-center hover:bg-[#7C5A9F] hover:text-white transition-all">
                  <Plus size={18} />
                </button>
              ) : (
                <div className="bg-[#8E6A94] text-white flex items-center justify-between px-2 w-18 h-8 rounded-lg">
                  <button onClick={() => setQty(qty - 1)}><Minus size={14} /></button>
                  <span className="font-bold text-sm mx-2">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}><Plus size={14} /></button>
                </div>
              )}
              <button onClick={() => setIsFavorite(!isFavorite)} className={`border w-8 h-8 rounded-lg flex items-center justify-center ${isFavorite ? 'bg-[#711A2E] text-white' : 'text-[#711A2E]'}`}>
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};