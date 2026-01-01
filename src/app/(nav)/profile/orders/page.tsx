"use client";
import React, { useState, useEffect } from 'react';
import { Loader2, Package, ShoppingBag, Truck } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

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
        toast.error("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Filter logic based on typical e-commerce status flow
  const activeOrders = orders.filter(o => ["pending", "shipped", "processing"].includes(o.status));
  const pastOrders = orders.filter(o => ["delivered", "cancelled", "returned"].includes(o.status));

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#7F5B98] h-10 w-10" />
        <p className="text-gray-400 font-medium animate-pulse">Fetching your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] bg-white p-4 md:p-8 animate-in fade-in duration-700">
      {/* Active Orders Section */}
      <section className="mb-12">
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b border-gray-100 pb-3 flex items-center gap-3">
          <Truck className="text-[#7F5B98]" size={20} /> Active Orders
        </h2>
        {activeOrders.length === 0 ? (
          <div className="py-12 bg-gray-50/50 rounded-sm border border-dashed text-center">
            <p className="text-[16px] text-gray-400 font-medium italic">No active shipments at the moment.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {activeOrders.map((order) => (
              <OrderCard key={order._id} order={order} isActive={true} />
            ))}
          </div>
        )}
      </section>

      {/* Past Orders Section */}
      <section>
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b border-gray-100 pb-3 flex items-center gap-3">
          <ShoppingBag className="text-gray-400" size={20} /> Past Orders
        </h2>
        {pastOrders.length === 0 ? (
          <div className="py-12 text-center border border-gray-50 rounded-sm">
            <p className="text-[16px] text-gray-500 font-medium">You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
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
    <div className="border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-all bg-white overflow-hidden group">
      {/* Order Info Header [Matches image_74b5f1.png color palette] */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4 group-hover:bg-gray-100/50 transition-colors">
        <div className="flex gap-10 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-gray-400">
          <div>
            <p className="mb-1 opacity-70">Order Placed</p>
            <p className="text-gray-700">{date}</p>
          </div>
          <div>
            <p className="mb-1 opacity-70">Total Paid</p>
            <p className="text-gray-700">₹{order.totalAmount?.toFixed(2)}</p>
          </div>
          <div className="hidden lg:block">
            <p className="mb-1 opacity-70">Ship To</p>
            <p className="text-[#7F5B98] hover:text-[#DA0428] transition-colors cursor-pointer">{order.shippingAddress?.name}</p>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-tighter">ID: {order._id.toUpperCase()}</p>
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
            isActive ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
          }`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Items List [Matches image_76078e.png thumbnail & image_7540f3.png metadata] */}
          <div className="flex-1 space-y-8">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-start gap-5 group/item">
                <div className="w-24 h-24 bg-white border border-gray-100 rounded-sm flex-shrink-0 relative overflow-hidden p-2 shadow-sm group-hover/item:border-[#7F5B98]/30 transition-colors">
                  {item.product?.images?.[0] ? (
                    <Image 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      fill 
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-50 flex items-center justify-center"><Package className="text-gray-200" size={32} /></div>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="text-[15px] font-bold text-gray-800 line-clamp-1 leading-tight mb-1 hover:text-[#7F5B98] cursor-pointer transition-colors">
                    {item.product?.name || "Premium Haldiram's Savoury"}
                  </h4>
                  <p className="text-[12px] text-gray-400 font-medium mb-3">
                    Net Weight : {item.product?.netWeight || '400 gms'}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded-sm">
                       <span className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">Qty:</span>
                       <span className="text-[13px] font-bold text-gray-800">{item.quantity}</span>
                    </div>
                    <p className="text-[14px] font-black text-[#801020]">₹{item.price?.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Action Sidebar [Matches purple branding image_76078e.png] */}
          <div className="md:w-56 flex flex-col gap-2.5 shrink-0">
             <button className="w-full bg-[#7F5B98] text-white py-3 rounded-sm font-bold text-[11px] uppercase tracking-[0.15em] hover:bg-[#6b4c81] hover:shadow-md transition-all active:scale-[0.98]">
                Track My Order
             </button>
             <button className="w-full bg-white border border-gray-200 text-gray-600 py-2.5 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:bg-gray-50 hover:border-gray-300 transition-all">
                Order Invoice
             </button>
             <div className="h-px bg-gray-100 my-1" />
             <button className="w-full bg-white border border-gray-100 text-gray-500 py-2.5 rounded-sm font-bold text-[11px] uppercase tracking-widest hover:text-[#801020] hover:border-red-100 transition-all">
                Write a Review
             </button>
          </div>
        </div>
      </div>
      
      {/* Footer detail for mobile */}
      <div className="bg-gray-50/30 px-6 py-3 border-t border-gray-100 flex justify-between items-center md:hidden">
         <span className="text-[10px] font-bold text-gray-400 uppercase">Payment: Cash on Delivery</span>
         <span className="text-[10px] font-bold text-[#7F5B98] uppercase">Details</span>
      </div>
    </div>
  );
};

export default ManageOrdersPage;