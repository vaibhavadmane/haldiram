"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  Package, 
  IndianRupee, 
  Boxes, 
  ImagePlus, 
  X, 
  ChevronRight, 
  PlusCircle, 
  Loader2 
} from "lucide-react";

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [form, setForm] = useState<any>({ name: "", price: "", stock: "", category: "" });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories/tree").then(res => res.json()).then(setCategories);
  }, []);

  const subCategories = categories.find(c => c._id === selectedParent)?.children || [];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    // Toast for feedback on selection
    toast.success(`${files.length} images selected`);
    
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    toast.error("Image removed");
  };

  const addProduct = async () => {
    // 1. Validation Toast
    if (!form.name || !form.price || !form.stock) {
      return toast.error("Please fill in all product details");
    }
    if (images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    try {
      setLoading(true);
      const loadingToast = toast.loading("Uploading product data...");
      
      let imageUrls: string[] = [];
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(img => formData.append("images", img));

        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        
        if (!uploadRes.ok) throw new Error("Image upload failed");
        
        const uploadData = await uploadRes.json();
        imageUrls = uploadData.urls;
      }

      const res = await fetch("/api/admin/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, images: imageUrls }),
      });

      if (res.ok) {
        toast.dismiss(loadingToast);
        toast.success("Product published successfully!", { duration: 4000 });
        
        // Brief delay before reload so they see the success toast
        setTimeout(() => {
            location.reload();
        }, 1500);
      } else {
        throw new Error("Failed to save product");
      }
      
    } catch (err) {
      toast.dismiss(); // Remove loading toasts
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-10 font-sans">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Add New Product</h1>
            <p className="text-slate-500 mt-1">Fill in the details below to list a new item in your shop.</p>
          </div>
          <button
            disabled={loading || !form.name}
            onClick={addProduct}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
            {loading ? "Publishing..." : "Publish Product"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-500" /> General Information
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Name</label>
                  <input
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. Premium Kaju Katli"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price (INR)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        className="w-full rounded-xl border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="0.00"
                        onChange={e => setForm({ ...form, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inventory Stock</label>
                    <div className="relative">
                      <Boxes className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        className="w-full rounded-xl border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="Quantity"
                        onChange={e => setForm({ ...form, stock: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ImagePlus className="w-5 h-5 text-blue-500" /> Product Media
              </h2>
              
              <div className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-10 transition-colors hover:bg-slate-100/50">
                <input
                  type="file" multiple accept="image/*"
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  onChange={handleImageChange}
                />
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 rounded-full bg-white p-3 shadow-sm">
                    <ImagePlus className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG or WebP (Max 2MB each)</p>
                </div>
              </div>

              {previews.length > 0 && (
                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {previews.map((src, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                      <img src={src} className="h-full w-full object-cover" alt="preview" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 rounded-full bg-rose-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column: Categories */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-md font-bold text-slate-800 mb-4">Organization</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Category</label>
                  <select
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none"
                    onChange={e => {
                      setSelectedParent(e.target.value);
                      setForm({ ...form, category: "" });
                    }}
                  >
                    <option value="">Main Category</option>
                    {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Sub-Category</label>
                  <select
                    disabled={!selectedParent}
                    className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none disabled:opacity-50"
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select Option</option>
                    {subCategories.map((sc: any) => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-blue-900 p-6 text-white shadow-xl shadow-blue-100">
              <h3 className="font-bold text-sm mb-2">Pro Tip</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                High-quality images increase sales by up to 40%. Ensure your sweets look delicious in bright lighting!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}