"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, ShoppingCart, Heart, Menu, User, 
  ChevronDown, X, ChevronRight, Mail, Lock, 
  UserCircle, Loader2, Minus, Plus, ShoppingBag, MoveRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartLoading, setCartLoading] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const ADMIN_EMAIL = "admin@haldirams.com";
  const ADMIN_PASSWORD = "adminpassword123";

  // --- Session Persistence ---
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();

          setUser(data.user); 
        }
      } catch (err) {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  // --- Cart Functionality ---
  const fetchCart = async () => {
    if (!user) return; 
    setCartLoading(true);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();
      if (res.ok) setCartItems(data.items || []);
      
    } catch (error) {
      console.error(error);
    } finally {
      setCartLoading(false);
    }
  };

// Inside your Header component
useEffect(() => {
  if (user) fetchCart();

  // ✅ Add this listener to refresh cart when an order is placed
  window.addEventListener("orderPlaced", fetchCart);
  
  return () => {
    window.removeEventListener("orderPlaced", fetchCart);
  };
}, [user]);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      if (res.ok) fetchCart();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (res.ok) {
        toast.success("Item removed from cart");
        fetchCart();
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const getInitials = (name: string) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (authMode === "login" && formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      toast.success("Admin Logged In!");
      setIsLoginModalOpen(false);
      setLoading(false);
      router.push("/admin");
      return;
    }

    const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/signup";
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (!response.ok) throw new Error(data.error || "Authentication failed");

      toast.success(authMode === "login" ? "Welcome back!" : "Signup Successful!");
      
      if (authMode === "login") {
        setUser({ name: data.user.name, email: data.user.email });
      }

      setIsLoginModalOpen(false);
      setFormData({ name: "", email: "", password: "" });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setCartItems([]);
      setIsAccountOpen(false);
      setIsCartOpen(false);
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* --- Overlays --- */}
      {(isDrawerOpen || isCartOpen) && (
        <div className="fixed inset-0 bg-black/50 z-[2000] transition-opacity" onClick={() => {setIsDrawerOpen(false); setIsCartOpen(false);}} />
      )}

      {/* --- CART DROPDOWN --- */}
      {isCartOpen && user && (
        <div className="fixed right-4 top-20 w-[380px] max-w-[95vw] bg-white shadow-2xl rounded-lg z-[3000] overflow-hidden animate-in slide-in-from-right-5 duration-300">
          <div className="p-4 border-b flex justify-between items-center bg-gray-50">
            <span className="font-bold text-gray-800">{cartItems.length} Items</span>
            <span className="text-sm font-semibold text-gray-700">Subtotal: ₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {cartLoading ? (
              <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-[#DA0428]" /></div>
            ) : cartItems.length === 0 ? (
              <div className="p-10 text-center text-gray-500">Your cart is empty</div>
            ) : (
              cartItems.map((item) => {
                const productData = item.product;
                if (!productData) return null;
                const currentQty = item.quantity || 1;

                return (
                  <div key={item._id} className="p-4 border-b flex gap-4 relative group">
                    <div className="w-20 h-20 bg-gray-50 rounded-md border flex-shrink-0 relative overflow-hidden">
                      <Image src={productData.images?.[0] || logo} alt={productData.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-800 pr-6 leading-tight">{productData.name}</h4>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center bg-[#7F5B98] text-white rounded-md overflow-hidden">
                          <button onClick={() => updateQuantity(productData._id, currentQty - 1)} className="p-1 px-2.5 hover:bg-black/10"><Minus size={12} /></button>
                          <span className="px-2 text-sm font-bold">{currentQty}</span>
                          <button onClick={() => updateQuantity(productData._id, currentQty + 1)} className="p-1 px-2.5 hover:bg-black/10"><Plus size={12} /></button>
                        </div>
                        <span className="text-sm font-bold text-gray-900">₹{(item.price * currentQty).toFixed(2)}</span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(productData._id)} className="absolute top-4 right-4 text-gray-400 hover:text-[#DA0428]"><X size={16} /></button>
                  </div>
                );
              })
            )}
          </div>

      {/* ✅ CART DROPDOWN - FOOTER BUTTONS */}
<div className="p-4 grid grid-cols-2 gap-3 bg-white border-t">
  <Button 
    onClick={() => {
      setIsCartOpen(false); // Close the dropdown
      router.push("/checkout"); // Navigate to checkout page
    }}
    className="bg-[#7F5B98] hover:bg-[#6b4c81] text-white py-6 rounded-md font-bold uppercase tracking-wider text-xs shadow-md flex items-center justify-center gap-2"
  >
    <ShoppingBag className="mr-2 h-4 w-4" /> CHECKOUT
  </Button>
  
  <Button 
    variant="outline" 
    onClick={() => {
      setIsCartOpen(false);
      router.push("/cart");
    }}
    className="border-[#7F5B98] text-[#7F5B98] hover:bg-gray-50 py-6 rounded-md font-bold uppercase tracking-wider text-xs"
  >
    VIEW CART
  </Button>
</div>
        </div>
      )}

      {/* --- Auth Modal --- */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[3000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[500px] relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-red-600 z-10"><X size={24} /></button>
            <div className="p-10 pt-12 text-center">
              <Image src={logo} alt="Logo" width={80} height={80} className="mx-auto mb-4" />
              <h3 className="text-gray-800 text-2xl font-bold mb-8">{authMode === "login" ? "Login To Your Account" : "Create Account"}</h3>
              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === "signup" && (
                  <div className="relative"><UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input name="name" type="text" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-red-600 transition-all" /></div>
                )}
                <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input name="email" type="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-red-600 transition-all" /></div>
                <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} /><input name="password" type="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full pl-12 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-red-600 transition-all" /></div>
                <button type="submit" disabled={loading} className="w-full bg-[#DA0428] text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                  {loading && <Loader2 className="animate-spin h-5 w-5" />} {authMode === "login" ? "Login" : "Sign Up"}
                </button>
              </form>
              <div className="mt-8 text-center border-t pt-6">
                <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="text-red-600 font-bold hover:underline">
                  {authMode === "login" ? "Request Account Access" : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Side Drawer Menu --- */}
      <div className={`fixed top-0 left-0 h-full w-full max-w-[491px] bg-white z-[2001] shadow-xl transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 cursor-pointer text-[#DA0428]" onClick={() => setIsDrawerOpen(false)} />
            <span className="text-lg font-serif text-[#DA0428]">All Categories</span>
          </div>
        </div>
        <div className="p-4">
          <Button className="w-full bg-[#7F5B98] hover:bg-[#7F5B98]/90 text-white font-bold mb-6">CORPORATE</Button>
          <ul className="space-y-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="flex items-center justify-between text-gray-700 hover:text-[#DA0428]" onClick={() => setIsDrawerOpen(false)}>
                  <span className="text-sm font-medium">{item.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 w-full p-6 border-t bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2"><User className="h-5 w-5" /><span className="text-sm font-medium">Account</span></div>
          <button onClick={() => {setIsDrawerOpen(false); setIsLoginModalOpen(true);}} className="text-sm font-bold text-[#7F5B98] underline">
            {user ? user.name : "Sign In"}
          </button>
        </div>
      </div>

      {/* --- Main Header --- */}
      <header className="relative bg-white border-b z-[999]" onMouseLeave={() => setHoveredItem(null)}>
        <div className="mt-2.5 mx-8 flex items-start">
          <div className="shrink-0">
            <Link href="/"><Image src={logo} alt="Haldiram's" className="w-[140px] md:w-auto object-cover" priority /></Link>
          </div>
          <div className="w-full">
            <div className="flex h-12 justify-end items-center gap-4">
              <Button className="hidden lg:flex bg-[#7C5A9F] text-white font-semibold px-10 h-9.5 rounded-md">CORPORATE</Button>
              <div className="hidden sm:flex rounded-full ring-[1px] ring-[#DA0428] bg-white overflow-hidden">
                <Button className="bg-[#DA0428] rounded-l-full w-10.5 h-9.5 flex items-center justify-center p-0"><Search className="text-white h-5 w-5" /></Button>
                <Input placeholder="Search 200+ products" className="border-0 bg-transparent w-44 h-9.5 rounded-r-full focus-visible:ring-0 text-sm" />
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => user ? setIsCartOpen(!isCartOpen) : setIsLoginModalOpen(true)} className="relative p-2">
                  <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-[#DA0428] transition-colors" />
                  {user && cartItems.length > 0 && (
                    <span className="absolute top-1 right-1 bg-[#DA0428] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                      {cartItems.length}
                    </span>
                  )}
                </button>
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
                {/* Updated: Heart icon navigates to Favorites */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => user ? router.push("/profile/favorites") : setIsLoginModalOpen(true)}
                >
                  <Heart className="h-6 w-6 text-gray-700 hover:text-[#DA0428]" />
                </Button>

                {user ? (
                  <div className="relative">
                    <button onClick={() => setIsAccountOpen(!isAccountOpen)} className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-[#DA0428] font-bold h-9.5 w-9.5 rounded-full border border-gray-200 transition-all">
                      <span className="text-[13px]">{getInitials(user.name)}</span>
                    </button>
                    {isAccountOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-xl z-[2000] py-1 animate-in fade-in slide-in-from-top-1">
                        {/* Profile Dropdown Navigation updated to match established folder structure */}
                        <Link href="/profile" className="block px-5 py-2.5 text-[#4A5568] hover:bg-gray-50 hover:text-[#DA0428] text-[14px] font-medium" onClick={() => setIsAccountOpen(false)}>Profile</Link>
                        <Link href="/profile/addresses" className="block px-5 py-2.5 text-[#4A5568] hover:bg-gray-50 hover:text-[#DA0428] text-[14px] font-medium" onClick={() => setIsAccountOpen(false)}>Address List</Link>
                        <Link href="/profile/orders" className="block px-5 py-2.5 text-[#4A5568] hover:bg-gray-50 hover:text-[#DA0428] text-[14px] font-medium" onClick={() => setIsAccountOpen(false)}>Manage Orders</Link>
                        <Link href="/profile/payments" className="block px-5 py-2.5 text-[#4A5568] hover:bg-gray-50 hover:text-[#DA0428] text-[14px] font-medium" onClick={() => setIsAccountOpen(false)}>Payment & Refund</Link>
                        <Link href="/profile/favorites" className="block px-5 py-2.5 text-[#4A5568] hover:bg-gray-50 hover:text-[#DA0428] text-[14px] font-medium" onClick={() => setIsAccountOpen(false)}>Favorites</Link>
                        <Link href="/support" className="block px-5 py-2.5 text-[#4A5568] hover:bg-gray-50 hover:text-[#DA0428] text-[14px] font-medium" onClick={() => setIsAccountOpen(false)}>Support</Link>
                        <div className="border-t mt-1 pt-1">
                          <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-red-600 font-bold text-[15px] hover:bg-red-50 transition-colors">LogOut</button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => {setAuthMode("login"); setIsLoginModalOpen(true);}}>
                    <User className="h-6 w-6 text-gray-700 hover:text-[#DA0428]" />
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </div>
        {hoveredItem && (
          <div onMouseEnter={() => setHoveredItem(hoveredItem)} className="absolute left-0 w-full shadow-2xl z-[1000] animate-in fade-in slide-in-from-top-2">
            <NavSection title={hoveredItem} />
          </div>
        )}
        <AnnouncementBar />
      </header>
    </>
  );
};

export default Header;