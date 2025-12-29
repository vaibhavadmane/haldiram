"use client";
import { useEffect, useState } from "react";
import { 
  Users, ShoppingBag, Wallet, Search, Phone, Mail, MapPin, 
  History, ArrowUpRight, TrendingUp, PackageCheck 
} from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/admin/users/orders")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const initials = (name: string) =>
    name?.split(" ").map((n: string) => n[0]).join("").toUpperCase() || "??";

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F1F4F9] p-3 md:p-10 font-sans antialiased">
      <div className="mx-auto max-w-7xl">
        
        {/* HEADER & SEARCH */}
        <div className="mb-8 md:mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-100 shrink-0">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <span>Customer <span className="text-indigo-600">Intelligence</span></span>
            </h1>
            <p className="text-slate-500 font-medium mt-2 text-sm md:text-base">Analyze behavior and spending patterns.</p>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              className="w-full bg-white border-none shadow-sm rounded-2xl py-3 md:py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-slate-400 font-black text-xs uppercase tracking-widest">Compiling Analytics</p>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-10">
            {filteredUsers.map((u) => (
              <div key={u.userId} className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-xl">
                
                {/* USER PROFILE HEADER */}
                <div className="p-6 md:p-10 border-b border-slate-50 bg-slate-50/30">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6">
                      <div className="flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl md:rounded-[2rem] bg-indigo-600 text-xl md:text-2xl font-black text-white shadow-lg">
                        {initials(u.name)}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl md:text-2xl font-[900] text-slate-900 leading-tight truncate">{u.name}</h2>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2">
                          <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-500"><Mail className="w-3 h-3" /> {u.email}</span>
                          <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-500"><Phone className="w-3 h-3" /> {u.phone || "N/A"}</span>
                        </div>
                      </div>
                    </div>

                    {/* KPI CARDS - Horizontal scroll on mobile */}
                    <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-3 gap-3 md:gap-6 no-scrollbar">
                      <KPICard label="Orders" value={u.totalOrders} icon={<ShoppingBag />} color="text-indigo-600" />
                      <KPICard label="Items" value={u.totalProducts} icon={<PackageCheck />} color="text-emerald-600" />
                      <KPICard label="Spent" value={`₹${u.totalAmountSpent}`} icon={<Wallet />} color="text-amber-600" />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
                  {/* ADDRESS NODE */}
                  <div className="lg:col-span-4 space-y-6">
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5" /> Residence
                      </h3>
                      <div className="p-5 md:p-6 rounded-2xl md:rounded-[2rem] bg-slate-50 border border-slate-100 text-xs md:text-sm font-bold text-slate-700 leading-relaxed shadow-inner">
                        {u.address ? (
                          <>
                            <p>{u.address.street}</p>
                            <p>{u.address.city}, {u.address.state}</p>
                            <p className="mt-2 text-indigo-600 font-mono text-[10px]">{u.address.pincode}</p>
                          </>
                        ) : (
                          <p className="text-slate-400 italic">No address on file</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-5 rounded-2xl md:rounded-[2rem] bg-indigo-50 border border-indigo-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-black text-indigo-400 uppercase block mb-1">AOV Insight</span>
                        <p className="text-xs font-bold text-indigo-900">₹{(u.totalAmountSpent / (u.totalOrders || 1)).toFixed(0)} Avg / Order</p>
                      </div>
                      <TrendingUp className="w-5 h-5 text-indigo-600 opacity-30" />
                    </div>
                  </div>

                  {/* TRANSACTION REGISTRY */}
                  <div className="lg:col-span-8">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <History className="w-3.5 h-3.5" /> History
                    </h3>
                    <div className="space-y-3 md:space-y-4">
                      {u.orders.map((order: any) => (
                        <div key={order.orderId} className="group/order relative rounded-2xl md:rounded-3xl border border-slate-100 p-4 md:p-5 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <div className="h-9 w-9 md:h-10 md:w-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm border border-slate-100 font-mono text-[9px] font-bold shrink-0">
                               #{order.orderId.slice(-4)}
                             </div>
                             <div className="min-w-0">
                               <p className="text-xs md:text-sm font-black text-slate-800 truncate">Order {order.orderId}</p>
                               <span className="text-[9px] font-bold text-indigo-600 uppercase">Status: {order.status}</span>
                             </div>
                          </div>
                          
                          <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-8 border-t sm:border-t-0 pt-3 sm:pt-0">
                            <p className="text-base md:text-lg font-black text-slate-900">₹{order.totalAmount}</p>
                            <button className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all">
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function KPICard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white border border-slate-100 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm text-center min-w-[90px] md:min-w-[140px] shrink-0">
      <div className={`mx-auto w-6 h-6 md:w-8 md:h-8 ${color} opacity-60 mb-1 md:mb-2 flex items-center justify-center`}>
        {icon}
      </div>
      <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-sm md:text-xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
  );
}