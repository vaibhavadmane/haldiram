"use client";
import { log } from "node:console";
import { useEffect, useState } from "react";

// const ADMIN_KEY = "haldiram_admin_123"; // must match .env

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ✅ FETCH ALL ORDERS (ADMIN)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "http://localhost:3000/api/admin/orders",
          // {
          //   headers: {
          //     "ADMIN_API_KEY": ADMIN_KEY,
          //   },
          // }
        );
        
        
        const data = await res.json();
console.log("Res order",data);
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Orders fetch error:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ UPDATE ORDER STATUS
  const updateStatus = async (orderId: string, status: string) => {
    setUpdatingId(orderId);

    try {
      await fetch(
        "http://localhost:3000/api/admin/orders/update-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "ADMIN_API_KEY": ADMIN_KEY,
          },
          body: JSON.stringify({ orderId, status }),
        }
      );

      // optimistic UI update
      setOrders(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, status } : o
        )
      );
    } catch (err) {
      console.error("Update status error:", err);
      alert("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-purple-100 text-purple-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

 return (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Orders Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View, track and update customer orders
        </p>
      </div>
    </div>

    {/* Loading */}
    {loading && (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-gray-400">
          Loading orders…
        </p>
      </div>
    )}

    {/* No Orders */}
    {!loading && orders.length === 0 && (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium text-gray-400">
          No orders available
        </p>
      </div>
    )}

    {/* Orders List */}
    {!loading &&
      orders.map(order => (
        <div
          key={order._id}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
        >
          <div className="p-6 space-y-6">
            {/* Order Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Order ID
                  </p>
                  <p className="font-mono text-sm font-medium text-gray-800">
                    {order._id}
                  </p>
                </div>

                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">
                    Customer:
                  </span>
                  <span className="ml-1 font-medium">
                    {order.user?.name || "N/A"}
                  </span>
                </div>

                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">
                    Phone:
                  </span>
                  <span className="ml-1">
                    {order.user?.phone || "N/A"}
                  </span>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="text-2xl font-extrabold text-gray-900">
                  ₹{order.totalAmount}
                </p>

                <span
                  className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold capitalize ${statusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-4">
              <p className="text-sm font-semibold text-gray-700">
                Order Items
              </p>

              {order.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm"
                >
                  <img
                    src={
                      item.product?.images?.[0] ||
                      "/placeholder.png"
                    }
                    className="h-14 w-14 rounded-md border object-cover"
                    alt={item.product?.name}
                  />

                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {item.product?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Control */}
            <div className="flex items-center justify-end gap-4">
              <select
                value={order.status}
                disabled={
                  updatingId === order._id ||
                  order.status === "delivered"
                }
                onChange={e =>
                  updateStatus(order._id, e.target.value)
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>

              {updatingId === order._id && (
                <span className="text-sm font-medium text-gray-400">
                  Updating…
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
  </div>
);

}
