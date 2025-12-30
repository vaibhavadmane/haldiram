import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, MoveRight } from 'lucide-react';
import { StaticImageData } from 'next/image';

// Border Assets
import cardTop from './images/cardtop.png';
import cardMid from './images/cardmid.png';
import cardBottom from './images/cardbottom.png';
import dryfruit from './images/dryfruit.png';
import kajuroll from './images/kajuroll.png';

interface Product {
  id: number;
  name: string;
  price: string;
  image: StaticImageData;
}

const productData: Product[] = [
  { id: 1, name: "Kaju Roll", price: "909.00", image: kajuroll },
  { id: 2, name: "Coconut Dry Fruit Ladoo", price: "524.00", image: dryfruit }
];

export default function FestivalSection() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleUpdateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => {
      const currentQty = prev[id] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <section className="bg-[#FFF5ED] py-16 px-6 md:px-20 font-sans">
      <div className="flex justify-between items-end mb-12">
        <div>
          {/* Main heading as H1 */}
          <h1 className="text-4xl font-serif text-[#002855] mb-2">India's Favourites</h1>
          {/* Subheading as H2 */}
          <h2 className="text-[#A52A2A] text-sm font-medium">Serving India It's Favourites In Every Way Possible.</h2>
        </div>
        <div className="flex items-center gap-3 group cursor-pointer">
          <h2 className="text-sm font-semibold text-gray-700">View All</h2>
          <div className="bg-[#C8A05B] w-10 h-10 rounded-full flex items-center justify-center text-white">
            <MoveRight size={20} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-8">
        {productData.map((product) => {
          const qty = quantities[product.id] || 0;

          return (
            /* Forced Card Size: 360px x 245px */
            <div key={product.id} className="relative w-[245px] h-[360px] group flex flex-col">
              
              {/* Decorative Borders */}
              <div className="absolute top-0 left-0 w-full z-10">
                <Image src={cardTop} alt="" className="w-full h-auto" />
              </div>
              <div className="absolute top-0 bottom-0 left-0 w-full pointer-events-none">
                <Image src={cardMid} alt="" fill className="object-stretch" />
              </div>
              <div className="absolute bottom-0 left-0 w-full z-10">
                <Image src={cardBottom} alt="" className="w-full h-auto" />
              </div>

              {/* Content Container with reduced padding for small card size */}
              <div className="relative z-20 p-5 flex flex-col h-full">
                
                {/* Product Image - Smaller to fit the 245px height */}
                <div className="flex-grow flex items-center justify-center">
                  <div className="relative w-28 h-28 transition-transform group-hover:scale-105">
                    <Image src={product.image} alt={product.name} fill className="object-contain" />
                  </div>
                </div>

                <div className="mt-auto">
                  {/* Product Title as H2 */}
                  <h2 className="text-md font-bold text-gray-800 mb-2">{product.name}</h2>
                  
                  <div className="flex justify-between items-center h-8">
                    {/* Price as H2 */}
                    <h2 className="text-md font-bold text-gray-900">
                      ₹{product.price} <span className="text-[9px] text-gray-500 font-normal ml-1">Inc. GST</span>
                    </h2>

                    {/* Quantity Selector Logic */}
                    {qty === 0 ? (
                      <button 
                        onClick={() => handleUpdateQuantity(product.id, 1)}
                        className="border border-[#7C5A9F] text-[#7C5A9F] w-8 h-7 rounded flex items-center justify-center hover:bg-[#7C5A9F] hover:text-white transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    ) : (
                      <div className="bg-[#8E6A94] text-white flex items-center justify-between px-2 w-20 h-7 rounded-lg">
                        <button onClick={() => handleUpdateQuantity(product.id, -1)} className="hover:scale-110">
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <h2 className="font-bold text-sm">{qty}</h2>
                        <button onClick={() => handleUpdateQuantity(product.id, 1)} className="hover:scale-110">
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}