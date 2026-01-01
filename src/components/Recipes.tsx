"use client";

import React from 'react';
import { Heart, Clock, MoveRight } from 'lucide-react';
import Image, { StaticImageData } from "next/image";
import Link from 'next/link';

// Import your images
import rescard1 from '../components/images/rescard1.jpg'
import rescard2 from '../components/images/rescard2.jpg'
import rescard3 from '../components/images/rescard3.jpg'
import resc1 from '../components/images/resc1.png'

interface Recipe {
  id: number;
  title: string;
  image: StaticImageData;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  time: string;
  path: string; // Added path property for routing
  product?: {
    name: string;
    img: StaticImageData;
  };
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Punjabi Tadka Wrap",
    image: rescard1,
    difficulty: "Easy",
    time: "00:15 mins",
    path: "/recipes/page1", // Routes to subfolder page1
    product: { name: "Punjabi Tadka", img: resc1 }
  },
  {
    id: 2,
    title: "Bhujia Sandwich",
    image: rescard2,
    difficulty: "Moderate",
    time: "00:05 mins",
    path: "/recipes/page2", // Routes to subfolder page2
  },
  {
    id: 3,
    title: "Mini Aloo Masala Toast",
    image: rescard3,
    difficulty: "Easy",
    time: "00:05 mins",
    path: "/recipes/page3", // Routes to subfolder page3
  }
];

export default function ResponsiveRecipeSection() {
  return (
    <section className="bg-white py-8 md:py-12 px-4 md:px-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-lg md:text-2xl font-serif tracking-widest text-gray-800 uppercase">
          Recipes with a Twist
        </h2>
        <Link href="/recipes" className="flex items-center gap-2 group cursor-pointer">
          <span className="text-xs md:text-sm font-semibold text-gray-700">View All</span>
          <div className="bg-[#C8A05B] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
            <MoveRight size={18} />
          </div>
        </Link>
      </div>

      {/* Grid: Stacks on mobile, 3 columns on desktop */}
      <div className="flex flex-col md:flex-row gap-6">
        {recipes.map((recipe: Recipe) => (
          <div 
            key={recipe.id} 
            className="w-full md:w-[33%] h-auto md:h-[100vh] bg-white flex flex-col border border-gray-100 shadow-sm overflow-hidden rounded-lg md:rounded-none group"
          >
            {/* Image Container wrapped in Link */}
            <Link href={recipe.path} className="relative h-[250px] sm:h-[350px] md:h-[50vh] w-full overflow-hidden">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </Link>

            {/* Content Section */}
            <div className="p-5 md:p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#7C5A9F] text-white text-[10px] px-2 py-1 font-bold uppercase rounded-sm">
                  {recipe.difficulty}
                </span>
                {/* Heart icon - you can add onClick with e.stopPropagation() if needed */}
                <Heart size={20} className="text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
              </div>

              <Link href={recipe.path}>
                <h3 className="text-xl font-serif text-gray-800 mb-2 leading-snug hover:text-[#7C5A9F] transition-colors cursor-pointer">
                  {recipe.title}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-6">
                <Clock size={14} />
                <span>{recipe.time}</span>
              </div>

              {/* Products Section */}
              {recipe.product && (
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="text-[10px] uppercase text-gray-400 font-bold mb-3">Products Used</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-12">
                      <Image
                        src={resc1}
                        alt={recipe.product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{recipe.product.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}