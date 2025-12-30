import React from 'react';

export default function HaldiramsBanner() {
  return (
    <div className="w-full">
      {/* Container forced to exactly 111px */}
      <section className="w-full h-[111px] bg-[#D10014] px-6 md:px-16 flex items-center justify-between border-b-[3px] border-[#C8A05B]">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-white text-[32px] leading-none font-serif tracking-tight mb-1">
            With Love, From Haldiram's
          </h2>
          <p className="text-white text-[14px] font-sans font-normal opacity-90">
            Subscribe to our newsletter for Haldiram's offers.
          </p>
        </div>

        {/* Right Input Group */}
        <div className="flex items-center w-full max-w-[500px]">
          <div className="flex-grow">
            <input
              type="email"
              placeholder="Enter Email Id"
              className="w-full h-[46px] pl-4 text-[15px] text-gray-500 bg-white focus:outline-none placeholder:text-gray-400"
            />
          </div>
          <button 
            type="submit"
            className="bg-[#C8A05B] hover:bg-[#b58e4d] transition-colors w-[60px] h-[46px] flex items-center justify-center"
          >
            {/* Minimalist Arrow to match image */}
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-5 h-5 text-white stroke-current stroke-[2]"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" 
              />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}