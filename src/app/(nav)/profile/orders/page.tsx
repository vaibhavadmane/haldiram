"use client";
import React from 'react';

const ManageOrdersPage = () => {
  // Typical data structure for future integration
  const activeOrders = [];
  const pastOrders = [];

  return (
    <div className="min-h-[400px] bg-white p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* Active Orders Section */}
      <section className="mb-12">
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b border-gray-100 pb-2">
          Active Orders
        </h2>
        
        {activeOrders.length === 0 ? (
          <div className="py-10 text-center md:text-left">
            <p className="text-[16px] text-gray-600 font-medium">No Active Orders Found</p>
            <p className="text-sm text-gray-400 mt-2">Any orders you place will appear here until they are delivered.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Active Order Cards would go here */}
          </div>
        )}
      </section>

      {/* Past Orders Section */}
      <section>
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b border-gray-100 pb-2">
          Past Orders
        </h2>

        {pastOrders.length === 0 ? (
          <div className="py-10 text-center md:text-left">
            <p className="text-[16px] text-gray-600 font-medium">No Past Orders Found</p>
            <p className="text-sm text-gray-400 mt-2">You haven't completed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Past Order Cards would go here */}
          </div>
        )}
      </section>

      {/* Shop Now CTA - Optional but recommended for empty states */}
      {(activeOrders.length === 0 && pastOrders.length === 0) && (
        <div className="mt-10 p-6 bg-gray-50 rounded-sm border border-dashed border-gray-200 text-center">
          <p className="text-gray-700 mb-4">Hungry for some treats?</p>
          <button 
            onClick={() => window.location.href = '/savouries/healthy-snacks'}
            className="bg-[#7F5B98] text-white px-8 py-2 rounded-md font-bold hover:bg-[#6b4c81] transition-colors uppercase text-sm tracking-widest"
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageOrdersPage;