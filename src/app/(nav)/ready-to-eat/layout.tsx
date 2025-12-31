"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Asset Imports


import cardTop from '@/components/images/cardtop.png';
import cardBottom from '@/components/images/cardbottom.png';

export default function ReadyToEatLayout({ children }: { children: React.ReactNode }) {
  // Default active category
  const [openCategory, setOpenCategory] = useState<string | null>('cup-meal');

  const categories = [
    { id: 'cup-meal', name: 'Cup Meal', path: '/ready-to-eat/cup-meal' },
    { id: 'heat-and-eat', name: 'Heat and Eat', path: '/ready-to-eat/heat-and-eat' },
  ];

  const activeCategoryName = categories.find(cat => cat.id === openCategory)?.name || 'Cup Meal';

  return (
    <main className="min-h-screen bg-white">
     

      {/* 2. DYNAMIC BREADCRUMBS & SORT BAR */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center min-h-[80px] md:h-[105px] py-4 md:py-0 gap-4">
            
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[1rem] text-[#002147] font-serif">
              <Link href="/" className="hover:text-[#CD9951] transition-colors whitespace-nowrap">Home</Link>
              <span className="text-gray-400">›</span>
              <Link href="/ready-to-eat" className="hover:text-[#CD9951] transition-colors whitespace-nowrap">Ready to Eat</Link>
              <span className="text-gray-400">›</span>
              <span className="font-semibold text-[#002147] whitespace-nowrap">{activeCategoryName}</span>
            </nav>

            {/* Sort Dropdown */}
            <div className="relative w-full md:w-auto">
              <select className="appearance-none bg-white border border-[#7C5A9F] rounded-full px-6 py-2 pr-12 text-[1rem] text-[#002147] outline-none cursor-pointer hover:border-[#CD9951] transition-all w-full md:min-w-[240px]">
                <option>Sort by Position</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#002147]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SIDEBAR & CONTENT AREA */}
      <div className="px-10 py-10 flex flex-col md:flex-row gap-8">
        <aside className="w-[260px] flex-shrink-0">
          <div className="relative bg-white px-5 py-4 border-x border-[#CD9951]/20">
            {/* Sidebar Borders */}
            <div className="absolute top-4 bottom-4 left-0 w-[4px] flex justify-between z-10">
              <div className="w-[1px] h-full bg-[#CD9951]/60" />
              <div className="w-[1px] h-full bg-[#CD9951]/60" />
            </div>
            <div className="absolute top-4 bottom-4 right-0 w-[4px] flex justify-between z-10">
              <div className="w-[1px] h-full bg-[#CD9951]/60" />
              <div className="w-[1px] h-full bg-[#CD9951]/60" />
            </div>
            
            <div className="absolute top-0 left-0 w-full h-[22px]"><Image src={cardTop} alt="" fill className="object-fill" /></div>
            
            <nav className="py-8 flex flex-col gap-6 relative z-20">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenCategory(cat.id)}>
                    <Link href={cat.path} className={`text-[15px] font-semibold transition-all ${
                      openCategory === cat.id ? 'text-[#711A2E] underline underline-offset-4' : 'text-gray-600 hover:text-[#CD9951]'
                    }`}>
                      {cat.name}
                    </Link>
                  </div>
                </div>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 w-full h-[22px]"><Image src={cardBottom} alt="" fill className="object-fill" /></div>
          </div>
        </aside>

        <section className="w-full">
          {children}
        </section>
      </div>
    </main>
  );
}