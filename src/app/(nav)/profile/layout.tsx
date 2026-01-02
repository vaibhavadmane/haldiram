"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    { name: 'PROFILE', path: '/profile' },
    { name: 'ADDRESSES', path: '/profile/addresses' },
    { name: 'MANAGE ORDERS', path: '/profile/orders' },
    { name: 'PAYMENT & REFUND', path: '/profile/payments' },
    { name: 'FAVORITES', path: '/profile/favorites' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container mx-auto px-4 pt-6 md:pt-10">
        
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border rounded-sm mb-8 overflow-hidden">
          {/* - flex-nowrap + overflow-x-auto allows horizontal swiping on mobile
            - md:px-10 and md:justify-start for desktop alignment
            - scrollbar-hide (optional utility) or standard scroll behavior
          */}
          <ul className="flex items-center gap-6 md:gap-12 h-[55px] px-4 md:px-10 overflow-x-auto no-scrollbar scroll-smooth">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path} className="h-full flex flex-col justify-center relative flex-shrink-0">
                  <Link
                    href={item.path}
                    className={`text-[14px] md:text-[18px] font-medium tracking-wide transition-colors whitespace-nowrap ${
                      isActive ? 'text-red-600' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 rounded-t-md" />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Dynamic Content */}
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};

export default ProfileLayout;