import React from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

// Import local images - update these paths to match your project structure
import mobileMockup from './images/mobile.png';
import savouries from './images/SAVORIES.jpg';
import mithai from './images/MITHAI.jpg';
import bakery from './images/BAKERIES-_-CHOCOLATES2.jpg';
import frozen from './images/READY-TO-EAT-_-FROZEN.jpg';
import trailmix from './images/TRAIL-MIXES.jpg';

import festiveGiftImg from './images/festive-banner.png'; // Updated image

export default function GiftingPage() {
  const categories = [
    { name: "SAVOURIES", img: savouries },
    { name: "MITHAI", img: mithai },
    { name: "BAKERY & CHOCOLATES", img: bakery },
    { name: "READY TO EAT & FROZEN", img: frozen },
    { name: "TRAIL MIXES", img: trailmix },
  ];

  return (
    <div className="w-full min-h-[150vh] bg-[#FFF5ED] flex flex-col gap-16 pb-20">
      


      {/* 2. Mobile App Announcement Section */}
      <section className="px-6 md:px-20">
        
     <Image src={festiveGiftImg} alt='' />
        <div className="relative w-full border-y-[8px] border-x-[1.5px] border-[#C8A05B] bg-white p-10 md:p-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* App Mockup */}
            <div className="relative w-32 h-56 flex-shrink-0">
              <Image src={mobileMockup} alt="Mobile App UI" fill className="object-contain" />
            </div>

            {/* Middle Content Section */}
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-serif text-[#C8A05B] mb-8">
                Haldiram&apos;s Mobile App Coming Soon!
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[#C8A05B]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="fill-[#C8A05B] text-white" />
                  <span className="text-[11px] font-bold uppercase tracking-tight text-gray-700">Easy delivery, dine-in & takeaway</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="fill-[#C8A05B] text-white" />
                  <span className="text-[11px] font-bold uppercase tracking-tight text-gray-700">Access to the complete range</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={20} className="fill-[#C8A05B] text-white" />
                  <span className="text-[11px] font-bold uppercase tracking-tight text-gray-700">Exclusive offers & rewards</span>
                </div>
              </div>
            </div>

            {/* Coming Soon Call to Action */}
            <div className="bg-[#C8A05B] text-white px-12 py-5 rounded-[20px] text-center font-bold text-xl leading-snug shadow-md">
              Coming <br /> Soon
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Grid Section */}
      <section className="px-6 md:px-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <div key={index} className="relative aspect-square group cursor-pointer overflow-hidden shadow-sm">
              <Image 
                src={cat.img} 
                alt={cat.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
             
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}