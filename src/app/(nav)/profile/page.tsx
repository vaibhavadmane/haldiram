"use client";
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // State matching your API structure for Personal Details only
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male"
  });

  // ✅ Fetch user details on mount from your profile API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile/me");
        if (res.ok) {
          const data = await res.json();
          setProfileData({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            gender: data.gender || "Male"
          });
        }
      } catch (error) {
        toast.error("Failed to load profile details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await fetch("/api/profile/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Server error occurred");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin text-[#7F5B98]" size={40} />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
      {/* Personal Details Card */}
      <div className="bg-white border p-8 rounded-sm shadow-sm transition-all">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase">
            Your Personal Detail
          </h2>
          
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="text-purple-700 font-bold text-sm hover:underline uppercase tracking-tighter"
            >
              Edit
            </button>
          ) : (
            <div className="flex gap-4">
               <button 
                onClick={() => setIsEditing(false)}
                className="text-gray-400 font-bold text-sm hover:text-gray-600 uppercase tracking-tighter"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="text-red-600 font-bold text-sm hover:underline uppercase tracking-tighter"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <DetailRow 
            label="Name" 
            name="name"
            value={profileData.name} 
            isEditing={isEditing} 
            onChange={handleInputChange} 
          />
          <DetailRow 
            label="Email" 
            name="email"
            value={profileData.email} 
            isEditing={false} // Email typically stays locked
            onChange={handleInputChange} 
          />
          <DetailRow 
            label="Phone" 
            name="phone"
            value={profileData.phone} 
            isEditing={isEditing} 
            onChange={handleInputChange} 
          />
          
          <div className="flex border-b border-gray-100 pb-2">
            <span className="w-32 text-gray-800 font-bold text-[16px]">Gender</span>
            {!isEditing ? (
              <span className="text-gray-600 text-[16px]">{profileData.gender}</span>
            ) : (
              <select 
                name="gender"
                value={profileData.gender}
                onChange={handleInputChange}
                className="border border-orange-200 rounded px-2 py-1 text-sm outline-none focus:border-purple-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Loyalty Points Card */}
      <div className="bg-white border p-8 rounded-sm shadow-sm flex flex-col justify-center">
        <div className="text-center mb-6">
          <p className="text-gray-700 text-lg">
            Use your loyalty points, <span className="text-purple-700 cursor-pointer underline">Shop now!</span>
          </p>
        </div>

        <div className="flex justify-between items-baseline border-b pb-4 mb-4">
          <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase">
            Current Point Balance:
          </h2>
          <span className="text-purple-800 text-xl">0 points</span>
        </div>
        
        <p className="text-red-600 text-sm font-medium">
          Easy reward module disable
        </p>
      </div>
    </div>
  );
}

function DetailRow({ label, name, value, isEditing, onChange }: any) {
  return (
    <div className="flex border-b border-gray-100 pb-2 items-center">
      <span className="w-32 text-gray-800 font-bold text-[16px] shrink-0">{label}</span>
      {!isEditing ? (
        <span className="text-gray-600 text-[16px]">{value || "Not set"}</span>
      ) : (
        <input 
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-orange-200 rounded px-2 py-1 text-sm outline-none focus:border-purple-600 animate-in fade-in duration-300"
        />
      )}
    </div>
  );
}