"use client";
import React from 'react';

const PaymentRefundPage = () => {
  return (
    <div className="min-h-[400px] bg-white p-4 md:p-8 animate-in fade-in duration-500">
      <section>
        <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6 border-b border-gray-100 pb-2">
          Active Refund
        </h2>
        
        <div className="py-10">
          <p className="text-[18px] text-gray-900 font-medium">No Orders Found</p>
        </div>
      </section>

      {/* Additional helpful info for payments */}
      <div className="mt-10 p-6 bg-gray-50 rounded-sm border border-gray-100">
        <h3 className="text-sm font-bold text-[#7F5B98] uppercase mb-2">Refund Policy</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Refunds for cancelled orders will be processed within 5-7 working days to the original payment method. 
          If you have issues with a specific transaction, please contact our support.
        </p>
      </div>
    </div>
  );
};

export default PaymentRefundPage;