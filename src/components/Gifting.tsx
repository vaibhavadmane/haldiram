import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

// Import local images
import mobileMockup from './images/mobile.png';
import savouries from './images/SAVORIES.jpg';
import mithai from './images/MITHAI.jpg';
import bakery from './images/BAKERIES-_-CHOCOLATES2.jpg';
import frozen from './images/READY-TO-EAT-_-FROZEN.jpg';
import trailmix from './images/TRAIL-MIXES.jpg';
import festiveGiftImg from './images/festive-banner.png';

export default function GiftingPage() {
  const categories = [
    { name: "SAVOURIES", img: savouries },
    { name: "MITHAI", img: mithai },
    { name: "BAKERY & CHOCOLATES", img: bakery },
    { name: "READY TO EAT & FROZEN", img: frozen },
    { name: "TRAIL MIXES", img: trailmix },
  ];

  return (
    <div className="w-full min-h-screen bg-[#FFF5ED] flex flex-col gap-10 md:gap-16 pb-10 md:pb-20">
      
      {/* 2. Mobile App Announcement Section */}
      <section className="px-4 md:px-20 mt-10">
        <div className="mb-6">
          <Image 
            src={festiveGiftImg} 
            alt='Festive Gifting' 
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </div>

        {/* Changed padding to p-5 for extra mobile room */}
        <div className="relative w-full border-y-[6px] md:border-y-[8px] border-x-[1.5px] border-[#C8A05B] bg-white p-5 md:p-14">
          {/* Use flex-col for all mobile sizes, only switching to row at md (768px) */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
            
            {/* App Mockup */}
            <div className="relative w-24 h-40 md:w-32 md:h-56 flex-shrink-0">
              <Image src={mobileMockup} alt="Mobile App UI" fill className="object-contain" />
            </div>

            {/* Middle Content Section */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-serif text-[#C8A05B] mb-4 md:mb-8">
                Haldiram&apos;s Mobile App Coming Soon!
              </h2>
              
              <div className="flex flex-col gap-3 md:gap-6 text-[#C8A05B]">
                <div className="flex items-start justify-center md:justify-start gap-2">
                  <CheckCircle2 size={16} className="fill-[#C8A05B] text-white shrink-0 mt-0.5" />
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight text-gray-700">Easy delivery, dine-in & takeaway</span>
                </div>
                <div className="flex items-start justify-center md:justify-start gap-2">
                  <CheckCircle2 size={16} className="fill-[#C8A05B] text-white shrink-0 mt-0.5" />
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight text-gray-700">Access to the complete range</span>
                </div>
                <div className="flex items-start justify-center md:justify-start gap-2">
                  <CheckCircle2 size={16} className="fill-[#C8A05B] text-white shrink-0 mt-0.5" />
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight text-gray-700">Exclusive offers & rewards</span>
                </div>
              </div>
            </div>

            {/* Coming Soon Call to Action */}
            {/* Added max-width and internal text wrapping to prevent overflow */}
            <div className="w-full md:w-auto max-w-[200px] md:max-w-none bg-[#C8A05B] text-white px-6 md:px-12 py-3 md:py-5 rounded-[12px] md:rounded-[20px] text-center font-bold text-base md:text-xl leading-snug shadow-md">
              Coming <br className="hidden md:block" /> Soon
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Grid Section */}
      <section className="px-4 md:px-20 mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat, index) => (
            <div key={index} className="relative aspect-square group cursor-pointer overflow-hidden shadow-sm rounded-md">
              <Image 
                src={cat.img} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 flex items-end p-2 md:p-4">
                 <span className="text-white text-[9px] md:text-xs font-bold drop-shadow-md uppercase">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}