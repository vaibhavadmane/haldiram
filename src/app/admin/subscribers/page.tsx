"use client";
import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Calendar, 
  Download, 
  Search, 
  Loader2, 
  UserCheck, 
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

const AllSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch("/api/subscribe");
        if (res.ok) {
          const data = await res.json();
          setSubscribers(data);
        } else {
          toast.error("Failed to load subscribers");
        }
      } catch (error) {
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  // ✅ Functionality: Export to CSV
  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const headers = ["Email", "Subscription Date", "Status\n"];
    const csvContent = subscribers.map(sub => {
      const date = new Date(sub.createdAt).toLocaleDateString("en-IN");
      return `${sub.email},${date},Active`;
    }).join("\n");

    const blob = new Blob([headers.join(",") + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `subscribers_list_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV Exported successfully");
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#7F5B98] h-10 w-10" />
        <p className="text-gray-500 font-bold tracking-tight uppercase text-xs">Loading Database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-4 md:p-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-[28px] font-serif text-[#801020] uppercase tracking-[0.2em] mb-2">
            Newsletter Database
          </h1>
          <p className="text-sm text-gray-500 flex items-center gap-2 font-medium">
            <UserCheck size={18} className="text-green-600" /> 
            Active Reach: <span className="font-extrabold text-black text-lg ml-1">{subscribers.length}</span>
          </p>
        </div>

        <button 
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-[#7F5B98] text-white px-6 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-[#6b4c81] transition-all shadow-md active:scale-95"
        >
          <Download size={16} strokeWidth={3} /> Export to Excel / CSV
        </button>
      </div>

      {/* Search and Table Container */}
      <div className="max-w-6xl mx-auto bg-white rounded-sm border border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-white flex items-center gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by email address..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-sm text-sm outline-none transition-all font-medium placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-[10px] uppercase tracking-[0.15em] text-gray-400 font-black border-b border-gray-100">
                <th className="px-8 py-5">Verified Email Address</th>
                <th className="px-8 py-5">Subscribed On</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-right">Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((sub) => (
                  <tr key={sub._id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#801020] border border-red-100">
                          <Mail size={16} />
                        </div>
                        <span className="text-[14px] font-bold text-gray-900 tracking-tight">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-[13px] text-gray-700 font-semibold">
                        <Calendar size={14} className="text-[#7F5B98]" />
                        {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="px-4 py-1.5 bg-green-50 text-green-700 text-[9px] font-black uppercase rounded-sm border border-green-200 tracking-widest">
                        Verified
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-gray-400 uppercase">
                        Web <ChevronRight size={14} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-24 text-center text-gray-400 font-medium">
                    <div className="flex flex-col items-center gap-2">
                       <Mail size={40} className="opacity-10 mb-2" />
                       <p className="tracking-widest uppercase text-xs">No records matching your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer info */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-500 font-bold uppercase tracking-[0.1em] flex justify-between items-center">
          <span>Viewing {filteredSubscribers.length} Entries</span>
          <span className="text-gray-300">|</span>
          <span className="text-[#801020]">Haldiram's Newsletter Admin Panel</span>
        </div>
      </div>
    </div>
  );
};

export default AllSubscribersPage;