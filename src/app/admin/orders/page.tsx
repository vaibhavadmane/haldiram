"use client";
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Orders
        </h1>
        <p className="text-sm text-gray-500">
          Manage customer orders and delivery status
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-lg bg-white p-6 text-center text-gray-400">
          Loading orders...
        </div>
      )}

      {/* No Orders */}
      {!loading && orders.length === 0 && (
        <div className="rounded-lg bg-white p-6 text-center text-gray-400">
          No orders found
        </div>
      )}

      {/* Orders List */}
      {!loading &&
        orders.map(order => (
          <div
            key={order._id}
            className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 space-y-4"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500">
                  Order ID
                </p>
                <p className="font-mono text-sm text-gray-800">
                  {order._id}
                </p>

                <p className="mt-2 text-sm text-gray-700">
                  Customer:
                  <span className="ml-1 font-medium">
                    {order.user?.name || "N/A"}
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  Phone:
                  <span className="ml-1">
                    {order.user?.phone || "N/A"}
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  ₹{order.totalAmount}
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="rounded-lg border bg-gray-50 p-4 space-y-3">
              {order.items?.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-4"
                >
                  <img
                    src={
                      item.product?.images?.[0] ||
                      "/placeholder.png"
                    }
                    className="h-14 w-14 rounded border object-cover"
                    alt={item.product?.name}
                  />

                  <div>
                    <p className="font-medium text-gray-800">
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
            <div className="flex justify-end">
              <select
                value={order.status}
                disabled={
                  updatingId === order._id ||
                  order.status === "delivered"
                }
                onChange={e =>
                  updateStatus(order._id, e.target.value)
                }
                className="rounded-md border border-gray-300 px-3 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           disabled:bg-gray-100"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {updatingId === order._id && (
                <span className="ml-3 text-sm text-gray-400">
                  Updating…
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
