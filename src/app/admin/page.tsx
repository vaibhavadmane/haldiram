"use client";
import { useEffect, useState } from "react";
// Note: You may need to install lucide-react: npm install lucide-react
import { 
  Users, 
  ShoppingBag, 
  Package, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  TrendingUp
} from "lucide-react";

type Stats = {
  users: number;
  orders: number;
  products: number;
  revenue: number;
  delivered: number;
  pending: number;
  shipped: number;
  cancelled: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    users: 0, orders: 0, products: 0, revenue: 0,
    delivered: 0, pending: 0, shipped: 0, cancelled: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/admin/users/orders");
        const data = await res.json();
        let totalOrders = 0, totalProducts = 0, totalRevenue = 0;
        let delivered = 0, pending = 0, shipped = 0, cancelled = 0;

        data.forEach((user: any) => {
          totalOrders += user.totalOrders || 0;
          totalProducts += user.totalProducts || 0;
          totalRevenue += user.totalAmountSpent || 0;
          (user.orders || []).forEach((order: any) => {
            if (order.status === "delivered") delivered++;
            else if (order.status === "pending") pending++;
            else if (order.status === "shipped") shipped++;
            else if (order.status === "cancelled") cancelled++;
          });
        });

        setStats({
          users: data.length, orders: totalOrders, products: totalProducts,
          revenue: totalRevenue, delivered, pending, shipped, cancelled,
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Real-time insights into your store's performance.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Live Updates
          </div>
        </header>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-10">
            {/* Primary Stats */}
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard 
                  title="Total Revenue" 
                  value={`₹${stats.revenue.toLocaleString()}`} 
                  icon={<IndianRupee className="w-5 h-5" />} 
                  trend="+12.5%" 
                  color="text-emerald-600"
                  bg="bg-emerald-50"
                />
                <StatCard 
                  title="Total Users" 
                  value={stats.users} 
                  icon={<Users className="w-5 h-5" />} 
                  color="text-blue-600"
                  bg="bg-blue-50"
                />
                <StatCard 
                  title="Total Orders" 
                  value={stats.orders} 
                  icon={<ShoppingBag className="w-5 h-5" />} 
                  color="text-indigo-600"
                  bg="bg-indigo-50"
                />
                <StatCard 
                  title="Items Sold" 
                  value={stats.products} 
                  icon={<Package className="w-5 h-5" />} 
                  color="text-amber-600"
                  bg="bg-amber-50"
                />
              </div>
            </section>

            {/* Secondary Stats / Status */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-800">Order Fulfillment</h2>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatusCard title="Delivered" value={stats.delivered} icon={<CheckCircle2 />} variant="green" />
                <StatusCard title="Pending" value={stats.pending} icon={<Clock />} variant="yellow" />
                <StatusCard title="Shipped" value={stats.shipped} icon={<Truck />} variant="blue" />
                <StatusCard title="Cancelled" value={stats.cancelled} icon={<XCircle />} variant="red" />
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function StatCard({ title, value, icon, color, bg, trend }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${bg} ${color}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-[11px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}

function StatusCard({ title, value, icon, variant }: any) {
  const styles: any = {
    green: "border-emerald-100 bg-emerald-50/30 text-emerald-700",
    yellow: "border-amber-100 bg-amber-50/30 text-amber-700",
    blue: "border-sky-100 bg-sky-50/30 text-sky-700",
    red: "border-rose-100 bg-rose-50/30 text-rose-700",
  };

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${styles[variant]} transition-transform hover:scale-[1.02]`}>
      <div className="mb-2 opacity-80">{icon}</div>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-70">{title}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-slate-200 rounded-2xl"></div>
      ))}
    </div>
  );
}