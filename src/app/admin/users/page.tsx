"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Users & Orders Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Complete user details with order history and spending
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl bg-white p-10 text-center text-gray-400 shadow">
          Loading users…
        </div>
      )}

      {/* Users */}
      {!loading &&
        users.map((u) => (
          <div
            key={u.userId}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="space-y-6 p-6">
              {/* User Header */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-700">
                    {initials(u.name)}
                  </div>

                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {u.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {u.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      📞 {u.phone || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-lg bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">
                      Orders
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {u.totalOrders}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">
                      Products
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {u.totalProducts}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">
                      Amount Spent
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      ₹{u.totalAmountSpent}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-2 text-sm font-semibold text-gray-800">
                  Address
                </p>
                <p className="text-sm text-gray-700">
                  {u.address
                    ? `${u.address.street}, ${u.address.city}, ${u.address.state} - ${u.address.pincode}`
                    : "No address available"}
                </p>
              </div>

              {/* Orders */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="mb-3 text-sm font-semibold text-gray-800">
                  Orders & Products
                </p>

                <div className="space-y-4">
                  {u.orders.map((order: any) => (
                    <div
                      key={order.orderId}
                      className="rounded-lg bg-white p-4 shadow-sm"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900">
                          Order ID: {order.orderId}
                        </p>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 capitalize">
                          {order.status}
                        </span>
                      </div>

                      <p className="mb-2 text-sm text-gray-600">
                        Total: ₹{order.totalAmount}
                      </p>

                      <div className="space-y-1">
                        {order.items.map((item: any, idx: number) => (
                          <p
                            key={idx}
                            className="text-sm text-gray-700"
                          >
                            • Product ID: {item.product} | Qty:{" "}
                            {item.quantity} | ₹{item.price}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
