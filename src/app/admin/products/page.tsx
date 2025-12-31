"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  Package, 
  IndianRupee, 
  Boxes, 
  ImagePlus, 
  X, 
  PlusCircle, 
  Loader2,
  FileText,
  Layout,
  Scale
} from "lucide-react";

export default function ProductsPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [form, setForm] = useState<any>({ name: "", price: "", stock: "", category: "", description: "", netWeight: "" });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/categories/tree").then(res => res.json()).then(setCategories);
  }, []);

  const subCategories = categories.find(c => c._id === selectedParent)?.children || [];

  const lightInputClass = "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
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
    if (!form.name || !form.price || !form.stock || !form.description || !form.netWeight) {
      return toast.error("Please fill in all product details including weight");
    }
    try {
      setLoading(true);
      const loadingToast = toast.loading("Publishing product...");
      
      let imageUrls: string[] = [];
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(img => formData.append("images", img));
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
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
        toast.success("Product listed successfully!");
        setTimeout(() => location.reload(), 1500);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to publish product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans pb-20">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section (Button Removed from here) */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-[800] text-slate-900 tracking-tight">Create Product</h1>
            <p className="text-slate-500 mt-1 font-medium text-sm md:text-base">Complete all sections to publish to your catalog.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (2 Columns) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* General Info Card */}
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Package size={20} /></div>
                Inventory Details
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Product Title</label>
                  <input
                    className={lightInputClass}
                    placeholder="Enter descriptive product name"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Price (INR)</label>
                    <div className="relative">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        className={`${lightInputClass} pl-12`}
                        placeholder="0.00"
                        onChange={e => setForm({ ...form, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Net Weight</label>
                    <div className="relative">
                      <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        className={`${lightInputClass} pl-12`}
                        placeholder="e.g. 500g"
                        onChange={e => setForm({ ...form, netWeight: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 text-black">Initial Stock</label>
                    <div className="relative">
                      <Boxes className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="number"
                        className={`${lightInputClass} pl-12`}
                        placeholder="Quantity"
                        onChange={e => setForm({ ...form, stock: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2">
                    <FileText size={12} /> Product Description
                  </label>
                  <textarea
                    rows={5}
                    className={`${lightInputClass} resize-none leading-relaxed`}
                    placeholder="Describe the taste, ingredients, and uniqueness..."
                    onChange={e => setForm({ ...form, description: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Media Upload Card */}
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-10 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><ImagePlus size={20} /></div>
                Gallery Assets
              </h2>
              
              <div className="group relative flex flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 transition-all hover:bg-slate-50 hover:border-blue-400">
                <input
                  type="file" multiple accept="image/*"
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  onChange={handleImageChange}
                />
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-white p-4 shadow-sm text-blue-500">
                    <ImagePlus size={32} />
                  </div>
                  <p className="text-sm font-bold text-slate-700">Add product images</p>
                  <p className="text-xs text-slate-400 mt-2 font-medium">PNG, JPG or WebP (Max 2MB)</p>
                </div>
              </div>

              {previews.length > 0 && (
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previews.map((src, idx) => (
                    <div key={idx} className="group relative aspect-square rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                      <img src={src} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="preview" />
                      <button 
                        onClick={() => removeImage(idx)}
                        className="absolute top-2 right-2 rounded-full bg-white/90 backdrop-blur-sm p-1.5 text-rose-500 opacity-0 group-hover:opacity-100 transition-all shadow-md hover:bg-rose-500 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area (Categorization and Final Button) */}
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Layout size={16} className="text-blue-600" /> Categorization
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                  <select
                    className={lightInputClass}
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Sub-Category</label>
                  <select
                    disabled={!selectedParent}
                    className={`${lightInputClass} disabled:opacity-40 disabled:bg-slate-100 disabled:cursor-not-allowed`}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select Option</option>
                    {subCategories.map((sc: any) => <option key={sc._id} value={sc._id}>{sc.name}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="font-bold text-xs uppercase tracking-widest">Ready to go live?</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6">
                Ensure all details and weights are correct. High quality images help customers choose your product faster.
              </p>
              
              {/* ✅ FINAL PUBLISH BUTTON: Stays at the bottom on all screens */}
              <button
                disabled={loading || !form.name}
                onClick={addProduct}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-blue-600 py-5 text-base font-black text-white shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <PlusCircle className="w-6 h-6" />}
                {loading ? "SYNCING..." : "PUBLISH PRODUCT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}