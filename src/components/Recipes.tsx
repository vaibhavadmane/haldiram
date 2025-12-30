import React from 'react';
import { Heart, Clock, MoveRight } from 'lucide-react';
import Image, { StaticImageData } from "next/image"; // Added StaticImageData type

// Import your images
import rescard1 from '../components/images/rescard1.jpg'
import rescard2 from '../components/images/rescard2.jpg'
import rescard3 from '../components/images/rescard3.jpg'
import resc1 from '../components/images/resc1.png'


interface Recipe {
  id: number;
  title: string;
  image: StaticImageData; // Changed from string to StaticImageData
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  time: string;
  product?: {
    name: string;
    img: string;
  };
}

const recipes: Recipe[] = [
  {
    id: 1,
    title: "Punjabi Tadka Wrap",
    image: rescard1, // Use the variable directly, not a string
    difficulty: "Easy",
    time: "00:15 mins",
    product: { name: "Punjabi Tadka", img: "https://placehold.co/40x60/png" }
  },
  {
    id: 2,
    title: "Bhujia Sandwich",
    image: rescard2,
    difficulty: "Moderate",
    time: "00:05 mins",
  },
  {
    id: 3,
    title: "Mini Aloo Masala Toast",
    image: rescard3,
    difficulty: "Easy",
    time: "00:05 mins",
  }
];

export default function ResponsiveRecipeSection() {
  return (
    <section className="bg-white py-8 px-4 md:px-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-serif tracking-widest text-gray-800 uppercase">
          Recipes with a Twist
        </h2>
        <div className="flex items-center gap-2 group cursor-pointer">
          <span className="text-xs md:text-sm font-semibold text-gray-700">View All</span>
          <div className="bg-[#C8A05B] w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110">
            <MoveRight size={18} />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {recipes.map((recipe: Recipe) => (
          <div 
            key={recipe.id} 
            className="w-full md:w-[33%] h-[100vh] bg-white flex flex-col border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Image Container with fill property */}
            <div className="relative h-[50vh] w-full">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#7C5A9F] text-white text-[10px] px-2 py-1 font-bold uppercase rounded-sm">
                  {recipe.difficulty}
                </span>
                <Heart size={20} className="text-gray-300 hover:text-red-500 cursor-pointer" />
              </div>

              <h3 className="text-xl font-serif text-gray-800 mb-2 leading-snug">
                {recipe.title}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-6">
                <Clock size={14} />
                <span>{recipe.time}</span>
              </div>

              {recipe.product && (
                <div className="mt-auto border-t border-gray-100 pt-4">
                  <p className="text-[10px] uppercase text-gray-400 font-bold mb-3">Products Used</p>
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-12">
                       <Image
                src={resc1}
                alt={recipe.title}
                fill
                className="object-cover"
                priority
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