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
      <div className="container mx-auto px-4 pt-10">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border rounded-sm flex items-center px-10 h-[55px] mb-8">
          <ul className="flex gap-12 h-full items-center">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path} className="h-full flex flex-col justify-center relative">
                  <Link
                    href={item.path}
                    className={`text-[18px] font-medium tracking-wide transition-colors ${
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
        <main>{children}</main>
      </div>
    </div>
  );
};

export default ProfileLayout;