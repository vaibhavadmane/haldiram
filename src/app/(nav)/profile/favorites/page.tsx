"use client";
import React from 'react';
import { ProductCard } from '@/components/ProductCard';

const FavoritesPage = () => {
  // Example favorite item
  const favoriteItems = [
    { id: 1, name: "Makhana Salt N Pepper", price: "169.00", image: "/images/makhana-1.png" }
  ];

  return (
    <div className="min-h-[600px] bg-white p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* 1. Favourite Products Section */}
      <section className="mb-16">
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-2">
          Your Favourites
        </h2>
        <p className="text-[13px] text-gray-600 mb-8">
          Showing {favoriteItems.length} of {favoriteItems.length} items in this list
        </p>

        <div className="flex flex-wrap gap-8">
          {favoriteItems.length > 0 ? (
            favoriteItems.map((product) => (
              <div key={product.id} className="relative">
                {/* Product Card Component */}
                <ProductCard product={product} />
                
                {/* Top-Right Remove Icon (Matches Image) */}
                <button className="absolute top-2 right-2 z-40 bg-white/80 rounded-full p-1 hover:text-red-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic">You haven't added any favourites yet.</p>
          )}
        </div>
      </section>

      {/* 2. Favourite Recipes Section */}
      <section>
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6">
          Your Favourite Recipes
        </h2>
        
        <div className="py-12 border-2 border-dashed border-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-sm">No favourite recipes found</p>
        </div>
      </section>

    </div>
  );
};

export default FavoritesPage;