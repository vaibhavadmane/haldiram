"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'; // Added hooks
import SavouriesBg from '@/components/images/Savouriesbg.jpg';
import StarVector from '@/components/images/Vector.png';
import cardTop from '@/components/images/cardtop.png';
import cardBottom from '@/components/images/cardbottom.png';

export default function SavouriesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    { id: 'healthy', name: 'Healthy Snacking', path: '/savouries/healthy-snacks' },
    { id: 'namkeens', name: 'Namkeens', path: '/savouries/namkeens' },
    { id: 'chai', name: 'Chai Time Snacks', path: '/savouries/chai-time-snacks' },
  ];

  // 1. FIX: Find active category based on URL pathname instead of local state
  const activeCategory = categories.find(cat => pathname.includes(cat.path)) || categories[0];

  // 2. FIX: Handle Sort Change using URL search params
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    
    // Pushes the new URL (e.g., /savouries/namkeens?sort=price-low)
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* TOP BANNER SECTION */}
     <section className="relative w-full h-[200px] md:h-[350px]">
  <Image 
    src={SavouriesBg} 
    alt="Banner" 
    fill 
    className="object-cover" 
    priority 
  />
  
  {/* The gold overlay bar */}
  <div className="absolute bottom-0 left-0 w-full z-10 flex items-center h-[70px] md:h-[111px] bg-[#CD9951]/80">
    <div className="container mx-auto px-6 md:px-10 flex items-center gap-3 md:gap-6">
      
      {/* Star Icon - Resizes on mobile */}
      <div className="relative w-[20px] h-[20px] md:w-[30px] md:h-[30px]">
        <Image 
          src={StarVector} 
          alt="Star" 
          fill
          className="brightness-0 invert object-contain" 
        />
      </div>

      {/* Heading - Scales from 2xl to 5xl */}
      <h1 className="text-white text-2xl md:text-5xl font-serif tracking-[0.1em] md:tracking-[0.2em] uppercase">
        Savouries
      </h1>
      
    </div>
  </div>
</section>

      {/* BREADCRUMBS & SORT BAR */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center min-h-[80px] md:h-[105px] py-4 md:py-0 gap-4">
            
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.9rem] md:text-[1rem] text-[#002147] font-serif">
              <Link href="/" className="hover:text-[#CD9951] transition-colors whitespace-nowrap">Home</Link>
              <span className="text-gray-400">›</span>
              <Link href="/savouries/healthy-snacks" className="hover:text-[#CD9951] transition-colors whitespace-nowrap">Savouries</Link>
              <span className="text-gray-400">›</span>
              <span className="font-semibold text-[#002147] whitespace-nowrap">
                {activeCategory.name}
              </span>
            </nav>

            {/* Updated Sort Dropdown */}
            <div className="relative w-full md:w-auto">
              <select 
                onChange={handleSortChange}
                value={searchParams.get('sort') || 'position'}
                className="appearance-none bg-white border border-[#7C5A9F] rounded-full px-6 py-2 pr-12 text-[0.9rem] md:text-[1rem] text-[#002147] outline-none cursor-pointer hover:border-[#CD9951] transition-all w-full md:min-w-[240px]"
              >
                <option value="position">Sort by Position</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
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

      <div className="px-10 py-10 flex flex-col md:flex-row gap-8">
        <aside className="w-[260px] flex-shrink-0">
          <div className="relative bg-white px-5 py-4 border-x border-[#CD9951]/20">
            <div className="absolute top-0 left-0 w-full h-[22px]">
              <Image src={cardTop} alt="" fill className="object-fill" />
            </div>

            <nav className="py-8 flex flex-col gap-6 relative z-20">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <Link 
                    href={cat.path} 
                    className={`text-[15px] font-semibold block transition-all ${
                      pathname.includes(cat.path) ? 'text-[#711A2E] underline underline-offset-4' : 'text-gray-600 hover:text-[#CD9951]'
                    }`}
                  >
                    {cat.name}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 w-full h-[22px]">
              <Image src={cardBottom} alt="" fill className="object-fill" />
            </div>
          </div>
        </aside>

        <section className="w-full">
          {children}
        </section>
      </div>
    </main>
  );
}