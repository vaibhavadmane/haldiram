"use client";
import React, { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // State to manage user details
  const [profileData, setProfileData] = useState({
    name: "Vaibhav Admane",
    email: "vaibhavadmane07@gmail.com",
    phone: "9981696697",
    gender: "Male"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically call your API to save the data
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
      {/* Personal Details Card */}
      <div className="bg-white border p-8 rounded-sm shadow-sm transition-all">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase">
            Your Personal Detail
          </h2>
          
          {/* Working Edit/Save Toggle Button */}
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
            isEditing={isEditing} 
            onChange={handleInputChange} 
          />
          <DetailRow 
            label="Phone" 
            name="phone"
            value={profileData.phone} 
            isEditing={isEditing} 
            onChange={handleInputChange} 
          />
          {/* Gender uses a Select when editing */}
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
      <div className="bg-white border p-8 rounded-sm shadow-sm flex flex-col">
        <div className="text-center mb-6">
          <p className="text-gray-700 text-lg">
            Use your loyalty points, <span className="text-purple-700 cursor-pointer underline">Shop now!</span>
          </p>
        </div>

        <div className="flex justify-between items-baseline border-b pb-4 mb-4">
          <h2 className="text-[20px] font-serif tracking-widest text-gray-800 uppercase">
            Current Point Balance:
          </h2>
          <span className="text-purple-800 text-xl">points</span>
        </div>
        
        <p className="text-red-600 text-sm font-medium">
          Easy reward module disable
        </p>
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DetailRow({ label, name, value, isEditing, onChange }: DetailRowProps) {
  return (
    <div className="flex border-b border-gray-100 pb-2 items-center">
      <span className="w-32 text-gray-800 font-bold text-[16px] shrink-0">{label}</span>
      {!isEditing ? (
        <span className="text-gray-600 text-[16px]">{value}</span>
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