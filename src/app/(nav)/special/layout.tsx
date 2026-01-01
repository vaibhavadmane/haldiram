"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SavouriesBg from '@/components/images/Savouriesbg.jpg';
import StarVector from '@/components/images/Vector.png';
import cardTop from '@/components/images/cardtop.png';
import cardBottom from '@/components/images/cardbottom.png';

export default function FestivalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
  
    { id: 'savouries', name: 'Festival Savouries', path: '/special/festival' },
  ];

  const activeCategory = categories.find(cat => pathname.includes(cat.path)) || categories[0];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white">
 

      {/* BREADCRUMBS & SORT BAR */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center min-h-[80px] md:h-[105px] py-4 md:py-0 gap-4">
            
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[0.9rem] text-[#002147] font-serif">
              <Link href="/" className="hover:text-[#CD9951] transition-colors">Home</Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-400 whitespace-nowrap">Special</span>
              <span className="text-gray-400">›</span>
              <span className="font-semibold text-[#002147] whitespace-nowrap">
                {activeCategory.name}
              </span>
            </nav>

            <div className="relative w-full md:w-auto">
              <select 
                onChange={handleSortChange}
                value={searchParams.get('sort') || 'position'}
                className="appearance-none bg-white border border-[#7C5A9F] rounded-full px-6 py-2 pr-12 text-[#002147] outline-none cursor-pointer w-full md:min-w-[240px]"
              >
                <option value="position">Sort by Position</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="px-10 py-10 flex flex-col md:flex-row gap-8">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-[260px] flex-shrink-0">
          <div className="relative bg-white px-5 py-4 border-x border-[#CD9951]/20">
            <div className="absolute top-0 left-0 w-full h-[22px]">
              <Image src={cardTop} alt="" fill className="object-fill" />
            </div>

            <nav className="py-8 flex flex-col gap-6 relative z-20">
              {categories.map((cat) => (
                <Link 
                  key={cat.id}
                  href={cat.path} 
                  className={`text-[15px] font-semibold block transition-all ${
                    pathname.includes(cat.path) ? 'text-[#711A2E] underline underline-offset-4' : 'text-gray-600 hover:text-[#CD9951]'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>

            <div className="absolute bottom-0 left-0 w-full h-[22px]">
              <Image src={cardBottom} alt="" fill className="object-fill" />
            </div>
          </div>
        </aside>

        {/* PAGE CONTENT */}
        <section className="w-full">
          {children}
        </section>
      </div>
    </main>
  );
}