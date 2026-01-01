"use client";
import React, { useState, useEffect } from 'react';
import { Loader2, Package, Search, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';

const ManageOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/my");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        toast.error("An error occurred while loading orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const activeOrders = orders.filter(order => order.status === "pending" || order.status === "shipped");
  const pastOrders = orders.filter(order => order.status === "delivered" || order.status === "cancelled");

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#7F5B98] h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-[400px] bg-white p-4 md:p-8 animate-in fade-in duration-500">
      <section className="mb-12">
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b border-gray-100 pb-2">
          Active Orders
        </h2>
        {activeOrders.length === 0 ? (
          <div className="py-10 text-center md:text-left">
            <p className="text-[16px] text-gray-600 font-medium">No Active Orders Found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeOrders.map((order) => (
              <OrderCard key={order._id} order={order} isActive={true} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b border-gray-100 pb-2">
          Past Orders
        </h2>
        {pastOrders.length === 0 ? (
          <div className="py-10 text-center md:text-left">
            <p className="text-[16px] text-gray-600 font-medium">No Past Orders Found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pastOrders.map((order) => (
              <OrderCard key={order._id} order={order} isActive={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const OrderCard = ({ order, isActive }: { order: any; isActive: boolean }) => {
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
      {/* Header Matches image_74b5f1.png style */}
      <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <div>
            <p className="mb-1">Order Placed</p>
            <p className="text-gray-800">{date}</p>
          </div>
          <div>
            <p className="mb-1">Total</p>
            <p className="text-gray-800">₹{order.totalAmount?.toFixed(2)}</p>
          </div>
          <div className="hidden sm:block">
            <p className="mb-1">Ship To</p>
            <p className="text-[#7F5B98] hover:underline cursor-pointer">{order.shippingAddress?.name}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-tighter">Order # {order._id.slice(-12).toUpperCase()}</p>
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
            isActive ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-start gap-4 animate-in slide-in-from-left-2">
                {/* Real Website Image Container matches image_76078e.png */}
                <div className="w-20 h-20 bg-white border border-gray-100 rounded-sm flex-shrink-0 relative overflow-hidden p-1 shadow-sm">
                  {item.product?.images?.[0] ? (
                    <Image 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      fill 
                      className="object-contain"
                    />
                  ) : (
                    <Package className="text-gray-200 m-auto mt-4" size={32} />
                  )}
                </div>
                {/* Details matches image_7540f3.png */}
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-gray-800 line-clamp-2 leading-tight mb-1">
                    {item.product?.name || "Premium Haldiram's Product"}
                  </p>
                  <p className="text-[12px] text-gray-400 mb-1">
                    Net Weight : {item.product?.netWeight || '250 gms'}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-[12px] font-bold text-gray-700">Qty : {item.quantity}</p>
                    <p className="text-[12px] font-bold text-[#801020]">₹{item.price?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Buttons matches purple branding image_76078e.png */}
          <div className="md:w-56 flex flex-col gap-2 pt-2">
             <button className="w-full bg-[#7F5B98] text-white py-2.5 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:bg-[#6b4c81] transition-all shadow-sm">
                Track Package
             </button>
             <button className="w-full bg-white border border-gray-200 text-gray-600 py-2.5 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:bg-gray-50 transition-all">
                Order Details
             </button>
             <button className="w-full bg-white border border-gray-200 text-gray-600 py-2.5 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:bg-gray-50 transition-all mt-2">
                Write a Review
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrdersPage;