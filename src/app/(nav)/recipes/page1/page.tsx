"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Share2, Heart, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import rescard1 from '../../../../components/images/rescard1.jpg'
// Mock Data - In a real app, fetch this based on the ID
const recipeData = {
  title: "Punjabi Tadka Wrap",
  prepTime: "00:15mins",
  image: rescard1,
  ingredients: [
    "TORTILLA", "BUTTER", "GREEN CHUTNEY", "TOMATO KETCHUP",
    "COLESLAW", "ONION LACCHA", "SHEZWAN CHUTNEY", "PUNJABI TADKA",
    "PERI PERI SEASONING"
  ],
  steps: [
    "Take 1 pc of tortilla.",
    "Apply 20gm of butter.",
    "Spread 10gm green chutney and 10gm of tomato ketchup.",
    "Place 50gm of coleslaw on tortilla, 50gm of onion laccha over it.",
    "Put 10gm shezwan chutney on the laccha.",
    "Add 50gm of Haldiram Punjabi tadka.",
    "Sprinkle 3gm of peri peri seasoning.",
    "Now gently roll the tortilla wrap.",
    "Place the wrap on griller and apply 20gm of butter on each side.",
    "Grill the wrap until the desired color.",
    "Cut it into half and serve it hot."
  ],
  productsUsed: [
    {
      id: "prod_1",
      name: "Punjabi Tadka",
      price: 51.60,
      image: "/path-to-product-image.png" // Replace with actual image
    }
  ]
};

const RecipeDetailPage = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = async (productId: string) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (res.ok) {
        toast.success("Added to cart!");
        window.dispatchEvent(new Event("cart-updated"));
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/recipes" className="hover:text-red-600 transition-colors">Recipes With A Twist</Link>
        <ChevronRight size={14} />
        <span className="text-red-700 font-medium">{recipeData.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Side: Image & Disclaimer */}
        <div className="lg:col-span-4">
          <div className="relative aspect-square rounded-sm overflow-hidden border border-gray-100 shadow-sm">
            <Image 
              src={recipeData.image} 
              alt={recipeData.title} 
              fill 
              className="object-cover"
            />
          </div>
          <p className="mt-6 text-[10px] leading-relaxed text-gray-500">
            <span className="text-red-600 font-bold">Disclaimer:</span> Images are for reference purpose only and Haldiram&apos;s reserved the rights for product packaging/size/name change without prior notice.
          </p>
        </div>

        {/* Right Side: Content */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-serif text-[#711A2E] mb-2">{recipeData.title}</h1>
              <div className="flex items-center gap-2 text-sm text-amber-600 font-medium">
                <Clock size={16} />
                <span>Preparation Time- {recipeData.prepTime}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-50 text-gray-500">
                <Share2 size={18} />
              </button>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 border rounded-md transition-all ${isFavorite ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-200 text-gray-500'}`}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Instructions Box */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-sm p-8">
            <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Ingredients Used</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8 text-sm text-gray-700 font-bold">
              {recipeData.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 uppercase">
                  <span className="w-1 h-1 bg-gray-400 rounded-full" /> {ing}
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Recipe</h3>
            <ol className="space-y-3 text-sm text-gray-600 leading-relaxed">
              {recipeData.steps.map((step, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-gray-800">{i + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;