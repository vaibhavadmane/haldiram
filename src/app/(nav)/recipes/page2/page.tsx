import React from 'react';
import Image from 'next/image';
import { Share2, Heart, Clock, ChevronRight } from 'lucide-react';

// Importing the local image
import rescard1 from '../../../../components/images/rescard2.jpg';

export default function RecipePage() {
  const ingredients = [
    "BREAD", "BUTTER", "TOMATO KETCHUP", "GREEN CHUTNEY", "ALOO MASALA",
    "ONION SLICE", "BIG GREEN CHILLY CHOPPED", "CHOPPED CORIANDER",
    "CHAAT MASALA", "CHEESE SLICE", "AGRA SEV"
  ];

  const steps = [
    "Take two slices of multigrain breads.",
    "Apply 5gm butter on the sides of each bread.",
    "Apply 5gm of tomato ketchup on one slice of bread and 5gm of green chutney on other slice.",
    "Add 50gm of aloo masala, 2-slices 2-onion slice, 5gm chaat masala and one cheese slice.",
    "Place another slice of bread on it.",
    "Toast the sandwich until you get the desired color.",
    "Cut it into half and garnish with 10gm of agra sev, serve it hot."
  ];

  return (
    <main className="max-w-6xl mx-auto p-4 md:p-8 bg-white font-sans text-slate-800">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Image and Disclaimer */}
        <div className="w-full md:w-1/2">
          {/* Use the Next.js Image Component */}
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <Image 
              src={rescard1} 
              alt="Mini Aloo Masala Toast"
              fill
              className="object-cover"
              priority // Use priority because this is the main LCP image
              placeholder="blur" // Optional: adds a nice blur-up effect while loading
            />
          </div>
          <p className="mt-4 text-[10px] text-gray-500 leading-relaxed uppercase tracking-tight">
            <span className="text-red-600 font-bold italic">Disclaimer:</span> Images are for reference purpose only and Haldiram's reserved the rights for product packaging/size/name change without prior notice.
          </p>
        </div>

        {/* Right Column: Recipe Details */}
        <div className="w-full md:w-1/2">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1 text-xs text-gray-500 mb-4 uppercase font-bold tracking-wider">
            <span>Recipes</span>
            <ChevronRight size={12} />
            <span>With A Twist</span>
            <ChevronRight size={12} />
            <span className="text-red-800">Mini Aloo Masala Toast</span>
          </nav>

          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-serif text-red-900 font-semibold">
              Mini Aloo Masala Toast
            </h1>
            <div className="flex gap-2">
              <button className="p-2 border border-red-100 rounded-md hover:bg-red-50 text-red-800 transition-colors">
                <Share2 size={18} />
              </button>
              <button className="p-2 border border-red-100 rounded-md hover:bg-red-50 text-red-800 transition-colors">
                <Heart size={18} />
              </button>
            </div>
          </div>

          {/* Prep Time */}
          <div className="flex items-center gap-2 text-sm mb-6 text-gray-700">
            <Clock size={16} className="text-amber-600" />
            <span className="font-bold">Preparation Time -</span>
            <span>00:05mins</span>
          </div>

          {/* Ingredients & Recipe Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 shadow-sm">
            <section className="mb-8">
              <h2 className="text-lg font-bold mb-4 text-slate-800 border-b border-slate-200 pb-2">Ingredients used</h2>
              <ul className="grid grid-cols-1 gap-2.5">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[11px] font-bold text-slate-700 uppercase tracking-tighter">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-4 text-slate-800 border-b border-slate-200 pb-2">Recipe</h2>
              <ol className="space-y-4">
                {steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-xs text-slate-600 leading-relaxed font-medium">
                    <span className="font-bold text-slate-900">{idx + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}