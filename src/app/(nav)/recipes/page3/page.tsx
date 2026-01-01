import React from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { Share2, Heart, Clock, ChevronRight } from 'lucide-react';

// Import your local image
import rescard1 from '../../../../components/images/rescard3.jpg';

const RecipePage = () => {
  const ingredients = [
    "BREAD",
    "BUTTER",
    "TOMATO KETCHUP",
    "GREEN CHUTNEY",
    "ALOO MASALA",
    "ONION SLICE",
    "BIG GREEN CHILLY CHOPPED",
    "CHOPPED CORIANDER",
    "CHAAT MASALA",
    "CHEESE SLICE",
    "AGRA SEV"
  ];

  const recipeSteps = [
    "Take two slices of multigrain breads.",
    "Apply 5gm butter on the sides of each bread.",
    "Apply 5gm of tomato ketchup on one slice of bread and 5gm of green chutney on other slice.",
    "Add 50gm of aloo masala, 2 slices of onion slice, 5gm chaat masala and one cheese slice.",
    "Place another slice of bread on it.",
    "Toast the sandwich until you get the desired color.",
    "Cut it into half and garnish with 10gm of agra sev, serve it hot."
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans bg-white">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Image & Disclaimer */}
        <div className="flex-1">
          {/* Using Next.js Image component with local import */}
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4 shadow-sm border border-gray-100">
            <Image 
              src={rescard1} 
              alt="Mini Aloo Masala Toast" 
              fill
              className="object-cover"
              priority // Prioritizes loading as it's the main image
            />
          </div>
          <p className="text-[10px] text-gray-600 leading-tight">
            <span className="text-red-600 font-bold italic">Disclaimer:</span> Images are for reference purpose only and Haldiram's reserved the rights for product packaging/size/name change without prior notice.
          </p>
        </div>

        {/* Right Column: Recipe Details */}
        <div className="flex-1">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1 text-xs text-gray-500 mb-2 uppercase tracking-wide">
            <span>Recipes With A Twist</span>
            <ChevronRight size={12} />
            <span className="text-red-800 font-medium">Mini Aloo Masala Toast</span>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-serif text-red-800 font-semibold">
              Mini Aloo Masala Toast
            </h1>
            <div className="flex gap-2">
              <button className="p-1.5 border border-red-200 rounded text-red-800 hover:bg-red-50 transition-colors">
                <Share2 size={16} />
              </button>
              <button className="p-1.5 border border-red-200 rounded text-red-800 hover:bg-red-50 transition-colors">
                <Heart size={16} />
              </button>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Clock size={16} className="text-amber-600" />
            <span className="font-bold text-gray-700">Preparation Time-</span>
            <span className="text-gray-600">00:05mins</span>
          </div>

          {/* Content Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-lg p-8 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Ingredients used</h2>
            <ul className="space-y-2 mb-8">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-xs font-bold text-slate-700 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">Recipe</h2>
            <ol className="space-y-3">
              {recipeSteps.map((step, index) => (
                <li key={index} className="flex gap-2 text-xs leading-relaxed text-slate-600 font-medium">
                  <span className="font-bold text-slate-800 min-w-[15px]">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;