"use client";
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddressPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6">
        Address Book
      </h2>

      {/* 1. Add Address Box */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="w-full max-w-[350px] h-[150px] border border-gray-100 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow bg-white"
      >
        <div className="flex items-center gap-2 text-[#7F5B98] font-medium">
          <div className="border-2 border-[#7F5B98] rounded-sm p-0.5">
            <Plus size={16} strokeWidth={3} />
          </div>
          <span className="text-lg">Add an Address</span>
        </div>
      </div>

      {/* 2. New Address Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-[650px] rounded-sm shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-[22px] font-serif text-[#002147]">New Address</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Form */}
            <form className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* First Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">First Name</label>
                  <input type="text" className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" />
                </div>

                {/* Middle Name */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <label className="text-sm font-bold text-gray-800">Middle Name</label>
                    <span className="text-[10px] text-gray-400 font-medium">Optional</span>
                  </div>
                  <input type="text" className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" />
                </div>

                {/* Last Name - Full Width */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-bold text-gray-800">Last Name</label>
                  <input type="text" className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" />
                </div>

                {/* Country - Full Width */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-bold text-gray-800">Country</label>
                  <select className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none bg-white appearance-none">
                    <option>India</option>
                  </select>
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">Street Address</label>
                  <input type="text" placeholder="House / Flat / Floor No." className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none placeholder:text-gray-300" />
                </div>

                {/* Street Address 2 */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <label className="text-sm font-bold text-gray-800">Street Address 2</label>
                    <span className="text-[10px] text-gray-400 font-medium">Optional</span>
                  </div>
                  <input type="text" className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">City</label>
                  <input type="text" className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" />
                </div>

                {/* State */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">State</label>
                  <select className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none bg-white appearance-none">
                    <option>Select State</option>
                    <option>Madhya Pradesh</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                  </select>
                </div>

                {/* Zip Code */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">ZIP / Postal Code</label>
                  <input type="text" className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">Phone Number</label>
                  <input type="tel" className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" />
                </div>

              </div>

              {/* Default Address Checkbox */}
              <div className="flex items-center gap-3 mt-8">
                <input type="checkbox" id="default" className="w-5 h-5 accent-[#7F5B98] border-red-600 rounded cursor-pointer" />
                <label htmlFor="default" className="text-sm text-gray-800 font-medium cursor-pointer">
                  Make this my default address
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6 mt-10">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-40 border-2 border-[#7F5B98] text-[#7F5B98] font-bold py-2.5 rounded-md hover:bg-gray-50 transition-colors uppercase tracking-widest text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-40 bg-[#7F5B98] text-white font-bold py-2.5 rounded-md hover:bg-[#6b4c81] transition-colors uppercase tracking-widest text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressPage;