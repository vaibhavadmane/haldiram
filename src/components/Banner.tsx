"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import banner1 from "./images/banner1.jpg";
import banner2 from "./images/banner2.webp";
import banner3 from "./images/banner3.webp";
import banner4 from "./images/banner4.webp";
import banner5 from "./images/banner5.webp";

const banners = [banner1, banner2, banner3, banner4, banner5];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  // Optional: Auto-slide logic to make it more dynamic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#fdf2f2]">
      {/* Slider Container */}
      {/* Mobile: 40vh | Tablet: 60vh | PC: 80vh */}
      <div className="relative h-[40vh] sm:h-[60vh] lg:h-[80vh] w-full overflow-hidden">
        
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400" />

        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out
              ${current === index ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            `}
          >
            <Image
              src={banner}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}

       
      </div>

      {/* Dots BELOW slider */}
      <div className="flex justify-center gap-3 py-4 bg-white">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all duration-300
              ${current === index ? "bg-red-600 scale-125" : "bg-gray-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
}