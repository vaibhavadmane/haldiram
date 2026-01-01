"use client";
import React, { useState, useEffect } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AddressPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // ✅ State for form inputs
  const [addressForm, setAddressForm] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: ""
  });

  // ✅ Fetch user profile data
  const fetchAddressData = async () => {
    try {
      const res = await fetch("/api/profile/me");
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        // Pre-fill form if address exists
        if (data.address) {
          setAddressForm({
            street: data.address.street || "",
            city: data.address.city || "",
            state: data.address.state || "",
            pincode: data.address.pincode || "",
            phone: data.phone || ""
          });
        }
      }
    } catch (error) {
      toast.error("Failed to load address book");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddressData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Edit Logic: Submit to API
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: addressForm.phone,
          address: {
            street: addressForm.street,
            city: addressForm.city,
            state: addressForm.state,
            pincode: addressForm.pincode
          }
        }),
      });

      if (res.ok) {
        toast.success("Address updated successfully!");
        setIsModalOpen(false);
        fetchAddressData(); // Refresh the display card
      } else {
        toast.error("Failed to save address");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSaveLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin text-[#7F5B98]" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase mb-6">
        Address Book
      </h2>

      <div className="flex flex-wrap gap-6">
        {/* ✅ Address Card (Displays saved data) */}
        {userData?.address?.street && (
          <div className="w-full max-w-[350px] p-6 border border-gray-100 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.08)] bg-white relative animate-in fade-in duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-50 p-1 rounded-full border border-red-500">
                <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                   <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white stroke-current stroke-[4]">
                     <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-[#7F5B98] text-[13px] font-bold uppercase tracking-wider hover:underline"
              >
                Edit
              </button>
            </div>

            <div className="space-y-1 text-gray-800">
              <p className="text-lg font-medium">{userData.name}</p>
              <p className="text-[15px]">{userData.address.street}</p>
              <p className="text-[15px] uppercase">
                INDIA, {userData.address.state} {userData.address.pincode}
              </p>
              <p className="text-[15px]">India</p>
              <p className="text-[15px] pt-3 font-medium">
                Phone {userData.phone}
              </p>
            </div>
          </div>
        )}

        {/* Add Address Box */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-[350px] h-[210px] border border-gray-100 rounded-sm shadow-[0_2px_15px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow bg-white"
        >
          <div className="flex items-center gap-2 text-[#7F5B98] font-medium">
            <div className="border-2 border-[#7F5B98] rounded-sm p-0.5">
              <Plus size={16} strokeWidth={3} />
            </div>
            <span className="text-lg">Add an Address</span>
          </div>
        </div>
      </div>

      {/* ✅ NEW ADDRESS / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-[650px] rounded-sm shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-[22px] font-serif text-[#002147]">
                {userData?.address?.street ? "Edit Address" : "New Address"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name (Read Only - from profile) */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-bold text-gray-800">Full Name</label>
                  <input type="text" value={userData?.name} disabled className="w-full border border-gray-100 bg-gray-50 rounded-md p-2.5 outline-none text-gray-500 cursor-not-allowed" />
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-sm font-bold text-gray-800">Street Address</label>
                  <input 
                    name="street"
                    value={addressForm.street}
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="House / Flat / Floor No." 
                    required
                    className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" 
                  />
                </div>

                {/* City */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">City</label>
                  <input 
                    name="city"
                    value={addressForm.city}
                    onChange={handleInputChange}
                    type="text" 
                    required
                    className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" 
                  />
                </div>

                {/* State */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">State</label>
                  <select 
                    name="state"
                    value={addressForm.state}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none bg-white"
                  >
                    <option value="">Select State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>

                {/* Zip Code */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">ZIP / Postal Code</label>
                  <input 
                    name="pincode"
                    value={addressForm.pincode}
                    onChange={handleInputChange}
                    type="text" 
                    required
                    className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" 
                  />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-800">Phone Number</label>
                  <input 
                    name="phone"
                    value={addressForm.phone}
                    onChange={handleInputChange}
                    type="tel" 
                    required
                    className="w-full border border-orange-200 rounded-md p-2.5 focus:border-[#7F5B98] outline-none" 
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-6 mt-10">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-40 border-2 border-[#7F5B98] text-[#7F5B98] font-bold py-2.5 rounded-md uppercase text-sm"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saveLoading}
                  className="w-40 bg-[#7F5B98] text-white font-bold py-2.5 rounded-md hover:bg-[#6b4c81] transition-colors uppercase text-sm flex items-center justify-center gap-2"
                >
                  {saveLoading && <Loader2 size={16} className="animate-spin" />}
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