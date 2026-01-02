import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HaldiramsBanner from "@/components/EmailSubscription"
import Greeting from "@/components/Gifting"
import savouries from '../../components/images/SAVORIES.jpg';
import mithai from '../../components/images/MITHAI.jpg';
import bakery from '../../components/images/BAKERIES-_-CHOCOLATES2.jpg';
import frozen from '../../components/images/READY-TO-EAT-_-FROZEN.jpg';
import trailmix from '../../components/images/TRAIL-MIXES.jpg';
import Image from "next/image";
/**
 * Layout for the (nav) route group.
 * This ensures every page inside /savouries, /mithai, /bakery, etc.
 * shares the same Header and Footer.
 */
export const dynamic = "force-dynamic";

export default function NavLayout({
     
  children,
}: {
  children: React.ReactNode;
}) {
     const categories = [
        { name: "SAVOURIES", img: savouries },
        { name: "MITHAI", img: mithai },
        { name: "BAKERY & CHOCOLATES", img: bakery },
        { name: "READY TO EAT & FROZEN", img: frozen },
        { name: "TRAIL MIXES", img: trailmix },
      ];
  return (
    
    <div className="flex flex-col min-h-screen">
         <div className="h-1.5 bg-[#CD9951]" />
      {/* Shared Header for all navigation-based routes */}
      <Header />
      
      {/* Main content area: This will render your category pages */}
      <main className="flex-grow">
        {children}
      </main>
      <section className="px-6 md:px-20 md:bg-[#DA0428] mb-40">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4  relative top-15">
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
      
      <HaldiramsBanner/>
      {/* Shared Footer */}
      <Footer />
    </div>
  );
}