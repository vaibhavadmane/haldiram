"use client";
import React from "react";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import Link from "next/link";

// Border Assets
import cardTop from "./images/menutop.png";
import cardBottom from "./images/menubottom.png";

// Category Images - Ensure these exist in your folder
import healthySnacksImg from "./images/Healthy-Snacking.jpg"; // Savouries
import namkeensImg from "./images/Namkeens.jpg";
import chaiTimeImg from "./images/Chai-Time-Snacks.jpg";

import ladooImg from "./images/Ladoo1.jpg"; // Mithai
import premiumSweetsImg from "./images/Premium-Sweets.jpg";
import gheeSweetsImg from "./images/Ghee-Sweets.jpg";

import bakeryImg from "./images/BAKERIES-_-CHOCOLATES2.jpg"; // Bakery
import cookiesImg from "./images/Cookies_-Khari-_-Rusks.jpg";

import heatEatImg from "./images/Heat-_-Eat_.jpg"; // Ready to Eat
import cupMealImg from "./images/Cup-Meals_.jpg";

import dryFruitsImg from "./images/Dry-Fruits_2.jpg"

interface NavContent {
  [key: string]: {
    description: string;
    subCategories: { name: string; image: any; href: string }[];
  };
}

const navData: NavContent = {
  "Savouries": {
    description: "Indulge in our wide assortment of namkeens, from spicy flavours to nut mixtures, that are sure to satisfy your cravings.",
    subCategories: [
      { name: "Healthy Snacking", image: healthySnacksImg, href: "/savouries/healthy-snacks" },
      { name: "Namkeens", image: namkeensImg, href: "/savouries/namkeens" },
      { name: "Chai Time Snacks", image: chaiTimeImg, href: "/savouries/chai-time-snacks" },
    ]
  },
  "Mithai": {
    description: "Experience the nostalgia and rich flavours of India with our scrumptious range of sweets, handcrafted to perfection.",
    subCategories: [
      { name: "Ladoo", image: ladooImg, href: "/mithai/ladoo" },
      { name: "Premium Sweets", image: premiumSweetsImg, href: "/mithai/premium-sweets" },
      { name: "Ghee Sweets", image: gheeSweetsImg, href: "/mithai/ghee-sweets" },
    ]
  },
  "Bakery Cookies and Chocolates": {
    description: "Explore our premium selection of crunchy cookies and artisanal chocolates, perfect for every sweet tooth.",
    subCategories: [
      { name: "Chocolate & Confectionary", image: bakeryImg, href: "/bakery/chocolates-confectionary" },
      { name: "Cookies", image: cookiesImg, href: "/bakery/cookies" },
    ]
  },
  "Ready To Eat And Frozen": {
    description: "Authentic Indian meals and snacks, flash-frozen to preserve freshness and ready in minutes.",
    subCategories: [
      { name: "Heat & Eat", image: heatEatImg, href: "/ready-to-eat/heat-and-eat" },
      { name: "Cup Meal", image: cupMealImg, href: "/ready-to-eat/cup-meal" },
    ]
  },
  "Trail Mixes and Dry Fruits": {
    description: "Nutritious and delicious curated mixes of premium dry fruits and nuts for healthy snacking.",
    subCategories: [
      { name: "Dry Fruits", image: dryFruitsImg, href: "/trail-mixes/dry-fruits" },
    ]
  }
};

export default function NavSection({ title }: { title: string }) {
  const content = navData[title] || navData["Savouries"];

  return (
    <div className="absolute left-0 top-full w-full h-[356px] bg-white z-[1000] shadow-2xl overflow-hidden border-t">
      <div className="relative w-full h-full px-12 md:px-20 flex items-center">
        <div className="absolute top-0 left-0 w-full h-[15px]">
          <Image src={cardTop} alt="" fill className="object-contain object-top" />
        </div>

        <div className="flex w-full items-center justify-between gap-12">
          <div className="w-[30%]">
            <span className="text-4xl font-serif text-[#002855] block mb-4">{title}</span>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">{content.description}</p>
            <Link href={content.subCategories[0].href} className="flex items-center gap-3 group w-fit">
              <span className="text-sm font-semibold text-gray-800">View All</span>
              <div className="bg-[#C8A05B] w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                <MoveRight size={20} />
              </div>
            </Link>
          </div>

          <div className="flex w-[60%] justify-start gap-10">
            {content.subCategories.map((sub, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[180px]">
                <Link href={sub.href} className="relative aspect-square w-full max-w-[160px] overflow-hidden rounded-lg bg-gray-50 border border-gray-100 mb-4 shadow-sm group">
                  <Image src={sub.image} alt={sub.name} fill className="object-cover transition-transform group-hover:scale-110" />
                </Link>
                <div className="flex items-center justify-between w-full max-w-[160px] px-1">
                  <span className="text-[11px] font-bold text-gray-700 uppercase">{sub.name}</span>
                  <Link href={sub.href} className="bg-[#C8A05B] w-7 h-7 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                    <MoveRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[15px]">
          <Image src={cardBottom} alt="" fill className="object-contain object-bottom" />
        </div>
      </div>
    </div>
  );
}