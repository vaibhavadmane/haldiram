"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { 
  LayoutDashboard, Layers, Package, 
  ShoppingBag, Users, LogOut, Menu, X, 
  Boxes, UserPlus 
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Categories", href: "/admin/categories", icon: <Layers className="w-5 h-5" /> },
    { name: "Products", href: "/admin/products", icon: <Package className="w-5 h-5" /> },
    { name: "All Products", href: "/admin/allproducts", icon: <Boxes className="w-5 h-5" /> },
    { name: "Orders", href: "/admin/orders", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "All Subscribers", href: "/admin/subscribers", icon: <UserPlus className="w-5 h-5" /> },
    { name: "Users", href: "/admin/users", icon: <Users className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => pathname === path;

  // ✅ LOGOUT FUNCTION: Optimized to prevent double toasts
  const handleLogout = () => {
    toast.dismiss(); // Clears any existing toasts to prevent duplicates
    toast.success("Logged out successfully");

    // Redirect to the landing page
    router.push("/"); 
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      {/* Configure Toaster with a limit for cleaner UI */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[60] bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${isCollapsed ? "lg:w-20" : "lg:w-72"} 
        ${isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex h-full flex-col py-6">
          
          {/* TOP SECTION: Logo/Branding */}
          <div className={`flex items-center mb-10 px-6 ${isCollapsed ? "lg:justify-center" : "justify-between"}`}>
            {(!isCollapsed || isMobileMenuOpen) && (
              <h2 className="text-xl font-black text-white tracking-tighter animate-in fade-in duration-500 uppercase">
                ADMIN<span className="text-indigo-500">PRO</span>
              </h2>
            )}
            <button 
              onClick={() => isMobileMenuOpen ? setIsMobileMenuOpen(false) : setIsCollapsed(!isCollapsed)}
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-white outline-none"
            >
              {(isCollapsed && !isMobileMenuOpen) ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="flex flex-col space-y-2 px-3 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  group flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200
                  ${isActive(item.href) 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "hover:bg-slate-800 hover:text-white"}
                  ${isCollapsed && !isMobileMenuOpen ? "lg:justify-center" : ""}
                `}
              >
                <div className="shrink-0">{item.icon}</div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className="truncate animate-in slide-in-from-left-2 duration-300">
                    {item.name}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* FOOTER ACTIONS: Logout button */}
          <div className="px-3 mt-auto border-t border-slate-800 pt-4">
            <button 
              onClick={handleLogout}
              className={`flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-rose-500/10 hover:text-rose-500 transition-all font-bold text-sm ${isCollapsed && !isMobileMenuOpen ? "lg:justify-center" : ""}`}
            >
              <LogOut className="w-5 h-5" />
              {(!isCollapsed || isMobileMenuOpen) && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 w-full flex flex-col transition-all duration-300">
        {/* Mobile Navbar: Visible only on small screens */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-50">
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-black tracking-tight uppercase">ADMIN PRO</span>
          <div className="w-6"></div> 
        </div>

        {/* Dynamic Page Content */}
        <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
          {children}
        </div>
      </main>

      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}