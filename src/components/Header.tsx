"use client";
import React, { useState } from "react";
import { Search, ShoppingCart, Heart, Menu, User, ChevronDown, X, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnnouncementBar from "./AnnouncementBar";
import NavSection from "./NavSection";
import logo from "./images/logo.webp";

export const navItems = [
  { name: "Savouries", href: "/savouries/healthy-snacks", hasDropdown: true },
  { name: "Mithai", href: "/mithai/ladoo", hasDropdown: true },
  { name: "Bakery Cookies and Chocolates", href: "/bakery/chocolates-confectionary", hasDropdown: true },
  { name: "Ready To Eat And Frozen", href: "/ready-to-eat/heat-and-eat", hasDropdown: true },
  { name: "Trail Mixes and Dry Fruits", href: "/trail-mixes/dry-fruits", hasDropdown: true },
];

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Modal State
  const haldiramRed = "#DA0428";

  return (
    <>
      {/* --- Side Drawer Overlay --- */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[2000] transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* --- Login Modal Overlay --- */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[3000] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[600px] relative overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-red-600 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Modal Logo */}
            <div className="flex justify-center -mt-6">
              <div className="bg-white p-2 rounded-full shadow-md">
                <Image src={logo} alt="Haldiram's" width={100} height={100} className="object-contain" />
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 pt-4 text-center">
              <h2 className="text-haldiram-red text-2xl font-serif mb-1">Welcome</h2>
              <h3 className="text-gray-800 text-3xl font-medium mb-8">Login To Your Account</h3>

              {/* Mobile Input Field */}
              <div className="flex items-center border border-orange-300 rounded-full overflow-hidden mb-6 max-w-[420px] mx-auto">
                <div className="px-4 py-3 border-r border-orange-300 text-gray-600 font-medium">
                  +91
                </div>
                <input 
                  type="tel" 
                  placeholder="Enter your mobile number" 
                  className="w-full px-4 py-3 outline-none text-gray-700 placeholder:text-gray-300"
                />
              </div>

              {/* Action Section */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-gray-400 font-medium">Request OTP</span>
                <button className="bg-[#C8A05B] text-white p-3 rounded-full hover:bg-[#b08d4f] transition-colors">
                  <MoveRight size={24} />
                </button>
              </div>

              {/* Footer Links */}
              <p className="text-[11px] text-gray-500 uppercase tracking-wider leading-relaxed">
                By continuing, you agree to our{" "}
                <Link href="#" className="underline font-bold">TERMS OF SERVICE</Link>{" "}
                and <Link href="#" className="underline font-bold">PRIVACY POLICY</Link>
              </p>
            </div>
            
            {/* Bottom Accent Bar */}
            <div className="h-12 bg-gray-50 w-full" />
          </div>
        </div>
      )}

      {/* --- Side Drawer Menu --- */}
      <div className={`fixed top-0 left-0 h-full w-[491px] bg-white z-[2001] shadow-xl transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 cursor-pointer text-[#DA0428]" onClick={() => setIsDrawerOpen(false)} />
            <span className="text-lg font-serif text-[#DA0428]">All Categories</span>
          </div>
        </div>
        
        <div className="p-4">
          <Button className="w-full bg-[#7F5B98] hover:bg-[#7F5B98]/90 text-white font-bold mb-6">
            CORPORATE
          </Button>
          
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href} 
                  className="flex items-center justify-between text-gray-700 hover:text-[#DA0428] transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Account</span>
          </div>
          <button 
            onClick={() => {setIsDrawerOpen(false); setIsLoginModalOpen(true);}} 
            className="text-sm font-bold text-[#7F5B98] underline"
          >
            Sign In
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="relative bg-white border-b z-[999]" onMouseLeave={() => setHoveredItem(null)}>
        <div className="mt-2.5 mx-8 flex items-start">
          <div className="shrink-0">
            <Link href="/">
              <Image src={logo} alt="Haldiram's" className="w-[140px] md:w-auto object-cover" priority />
            </Link>
          </div>
          <div className="w-full">
            <div className="flex h-12 justify-end items-center gap-4">
              <Button className="hidden lg:flex bg-[#7C5A9F] text-white font-semibold px-10 h-9.5 rounded-md">CORPORATE</Button>
              <div className="hidden sm:flex rounded-full ring-[1px] ring-[#DA0428] bg-white">
                <Button className="bg-[#DA0428] rounded-l-full w-10.5 h-9.5 flex items-center justify-center p-0"><Search className="text-white h-5 w-5" /></Button>
                <Input placeholder="Search 200+ products" className="border-0 bg-transparent w-44 h-9.5 rounded-r-full focus-visible:ring-0 text-sm" />
              </div>
              <div className="flex items-center gap-1">
                <Link href="/cart" className="relative p-2">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  <span className="absolute top-1 right-1 bg-[#DA0428] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(true)}><Menu className="h-7 w-7 text-gray-700" /></Button>
              </div>
            </div>
            <nav className="hidden lg:flex items-center justify-end gap-6 mt-2">
              {navItems.map((item) => (
                <div key={item.name} className="py-2" onMouseEnter={() => setHoveredItem(item.name)}>
                  <Link href={item.href} className={`flex items-center gap-1 text-[14px] font-medium transition-colors ${hoveredItem === item.name ? "text-[#DA0428] underline underline-offset-8 decoration-2" : "text-gray-700"}`}>
                    {item.name} {item.hasDropdown && <ChevronDown className={`h-4 w-4 transition-transform ${hoveredItem === item.name ? "rotate-180" : ""}`} />}
                  </Link>
                </div>
              ))}
              <div className="flex items-center gap-4 ml-6">
                <Button variant="ghost" size="icon"><Heart className="h-6 w-6" /></Button>
                {/* Profile Button triggers Modal */}
                <Button variant="ghost" size="icon" onClick={() => setIsLoginModalOpen(true)}>
                  <User className="h-6 w-6" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
        {hoveredItem && (
          <div onMouseEnter={() => setHoveredItem(hoveredItem)} className="absolute left-0 w-full shadow-2xl z-[1000]"><NavSection title={hoveredItem} /></div>
        )}
        <div className="relative z-[10]" onMouseEnter={() => hoveredItem && setHoveredItem(hoveredItem)}><AnnouncementBar /></div>
      </header>
    </>
  );
};

export default Header;