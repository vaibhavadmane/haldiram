"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  Package, User, Phone, MapPin, Truck, ChevronDown, 
  Loader2, ShoppingBag, Clock, ArrowUpRight, CreditCard, Hash
} from "lucide-react";

const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // FIXED: Removed http://localhost:3000 to work on deployed server
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);
    try {
      // FIXED: Removed http://localhost:3000 to work on deployed server
      const res = await fetch("/api/admin/orders/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setOrders(prev => prev.map(o => (o._id === orderId ? { ...o, status } : o)));
      toast.success(`Order marked as ${status.toUpperCase()}`);
    } catch (err) {
      toast.error("Status update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusStyles: any = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    confirmed: "bg-purple-50 text-purple-600 border-purple-100",
    shipped: "bg-blue-50 text-blue-600 border-blue-100",
    delivered: "bg-emerald-50 text-emerald-600 border-emerald-100",
    cancelled: "bg-rose-50 text-rose-600 border-rose-100",
  };

  const filteredOrders = statusFilter === "all" ? orders : orders.filter(o => o.status === statusFilter);

  return (
    <div className="min-h-screen bg-[#F4F7FE] p-3 md:p-10 font-sans antialiased">
      <div className="mx-auto max-w-7xl">
        
        {/* TOP COMMAND BAR */}
        <div className="mb-8 md:mb-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
              <div className="h-10 w-10 md:h-12 md:w-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight">
                Order <span className="text-indigo-600">Manifest</span>
              </h1>
            </div>
            <p className="text-slate-500 font-medium text-sm md:text-base">Precision logistics and fulfillment tracking.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/50 backdrop-blur-md p-2 rounded-2xl md:rounded-[2rem] border border-white shadow-xl">
            <button 
              onClick={() => setStatusFilter("all")}
              className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${statusFilter === "all" ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"}`}
            >
              All
            </button>
            {STATUS_OPTIONS.map(opt => (
              <button 
                key={opt}
                onClick={() => setStatusFilter(opt)}
                className={`px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${statusFilter === opt ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "text-slate-400 hover:text-slate-600"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl md:rounded-[3rem] border border-slate-100">
             <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
             <p className="text-slate-400 font-black text-xs uppercase tracking-[0.3em]">Retrieving Data</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:gap-10">
            {filteredOrders.length > 0 ? filteredOrders.map(order => (
              <div key={order._id} className="group relative bg-white rounded-3xl md:rounded-[3rem] border border-slate-100 shadow-sm transition-all duration-500 overflow-hidden">
                
                {/* CARD HEADER */}
                <div className="px-5 py-4 md:px-8 md:py-6 bg-slate-50/50 border-b border-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Serial Hash</span>
                      <div className="flex items-center gap-2">
                        <Hash className="w-3 h-3 md:w-4 md:h-4 text-indigo-400" />
                        <span className="font-mono text-[10px] md:text-sm font-bold text-slate-700 truncate max-w-[120px] md:max-w-none">{order._id}</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 md:px-4 md:py-1.5 rounded-lg md:rounded-xl border text-[9px] md:text-[10px] font-black uppercase tracking-widest ${statusStyles[order.status] || "bg-slate-50 text-slate-400 border-slate-100"}`}>
                      {order.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full md:w-auto gap-4">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Revenue</span>
                      <p className="text-xl md:text-3xl font-black text-slate-900 tracking-tighter">₹{order.totalAmount?.toLocaleString()}</p>
                    </div>
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 transition-all">
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                  </div>
                </div>

                <div className="p-5 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                  
                  {/* LEFT: CUSTOMER CARD */}
                  <div className="lg:col-span-4 space-y-6 md:space-y-8">
                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-[900] text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-indigo-600" /> Client Profile
                      </h4>
                      <div className="p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-[#F8FAFC] border border-slate-100">
                        <p className="text-lg md:text-xl font-black text-slate-800 mb-2 truncate">{order.user?.name || "Guest Checkout"}</p>
                        <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-500">
                          <Phone className="w-3.5 h-3.5" /> {order.user?.phone || "No Phone"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] md:text-[11px] font-[900] text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-600" /> Shipping Node
                      </h4>
                      <div className="p-4 md:p-6 rounded-2xl md:rounded-[2rem] bg-[#F8FAFC] border border-slate-100 text-[10px] md:text-xs font-bold text-slate-500 leading-relaxed">
                        <p className="text-slate-800 mb-1 uppercase tracking-wide">{order.shippingAddress?.name}</p>
                        <p className="truncate">{order.shippingAddress?.street}</p>
                        <p>{order.shippingAddress?.city}, {order.shippingAddress?.state}</p>
                        <div className="mt-3 inline-block px-2 py-1 bg-white rounded-lg border border-slate-200 text-indigo-600 font-mono text-[10px]">
                          {order.shippingAddress?.pincode}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: ITEMS & ACTIONS */}
                  <div className="lg:col-span-8 flex flex-col">
                    <h4 className="text-[10px] md:text-[11px] font-[900] text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-indigo-600" /> Contents
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8 flex-1">
                      {order.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl md:rounded-3xl bg-white border border-slate-100 transition-all">
                          <img src={item.product?.images?.[0] || "/placeholder.png"} className="h-12 w-12 md:h-16 md:w-16 rounded-xl md:rounded-2xl object-cover shadow-sm" alt="" />
                          <div className="min-w-0">
                            <p className="text-xs md:text-sm font-black text-slate-800 truncate">{item.product?.name}</p>
                            <p className="text-[10px] md:text-xs font-bold text-slate-400">
                              <span className="text-indigo-600">₹{item.price}</span> × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ACTION CONTROL */}
                    <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] bg-slate-800 shadow-xl">
                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <div className="h-9 w-9 bg-white/10 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-[9px] md:text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">Status Manager</p>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-initial">
                          <select
                            value={order.status}
                            disabled={updatingId === order._id || order.status === "delivered"}
                            onChange={e => updateStatus(order._id, e.target.value)}
                            className="w-full sm:w-44 appearance-none bg-white/10 border border-white/20 rounded-xl md:rounded-2xl px-4 py-2 md:py-3 text-[10px] font-black text-white uppercase tracking-widest outline-none transition-all cursor-pointer disabled:opacity-30"
                          >
                            {STATUS_OPTIONS.map(s => <option key={s} value={s} className="text-slate-900">{s}</option>)}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                        </div>
                        {updatingId === order._id && <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
                <p className="text-slate-400 font-bold">No orders found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}