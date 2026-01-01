import React from 'react';

export default function HaldiramsBanner() {
  return (
    <div className="w-full">
      {/* Mobile: Auto height, vertical padding, flex-col 
          PC: Fixed 111px height, flex-row
      */}
      <section className="w-full min-h-[111px] h-auto lg:h-[111px] bg-[#D10014] px-6 md:px-16 py-8 lg:py-0 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0 border-b-[3px] border-[#C8A05B]">
        
        {/* Left Content - Center aligned on mobile, left on PC */}
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-white text-[24px] md:text-[32px] leading-tight lg:leading-none font-serif tracking-tight mb-2 lg:mb-1">
            With Love, From Haldiram's
          </h2>
          <p className="text-white text-[13px] md:text-[14px] font-sans font-normal opacity-90">
            Subscribe to our newsletter for Haldiram's offers.
          </p>
        </div>

        {/* Right Input Group - Full width on mobile, limited on PC */}
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
            className="bg-[#C8A05B] hover:bg-[#b58e4d] transition-colors w-[60px] h-[46px] flex items-center justify-center shrink-0"
          >
            {/* Minimalist Arrow */}
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