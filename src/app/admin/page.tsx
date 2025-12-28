"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    products: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users/orders")
      .then(res => res.json())
      .then(data => {
        const usersCount = data.length;

        const totalOrders = data.reduce(
          (sum: number, u: any) => sum + u.totalOrders,
          0
        );

        const totalProducts = data.reduce(
          (sum: number, u: any) => sum + u.totalProducts,
          0
        );

        const totalRevenue = data.reduce(
          (sum: number, u: any) => sum + u.totalAmountSpent,
          0
        );

        setStats({
          users: usersCount,
          orders: totalOrders,
          products: totalProducts,
          revenue: totalRevenue,
        });

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of store performance
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="rounded-xl bg-white p-10 text-center text-gray-400 shadow-sm">
          Loading dashboard…
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <Stat title="Total Orders" value={stats.orders} />
          <Stat title="Products Sold" value={stats.products} />
          <Stat title="Users" value={stats.users} />
          <Stat title="Revenue" value={`₹${stats.revenue}`} />
        </div>
      )}
    </div>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-bold text-gray-800">
        {value}
      </h2>
    </div>
  );
}
