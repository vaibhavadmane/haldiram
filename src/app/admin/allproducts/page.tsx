"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  Hash, Trash2, Edit, Search, Box, IndianRupee, 
  Layers, Copy, Check, X, Loader2, ArrowUpRight,
  Info, FileText, Tag, Calendar, Scale 
} from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [viewingProduct, setViewingProduct] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    toast.success("ID Copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        toast.success("Product removed");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      
      if (res.ok) {
        const updated = await res.json();
        setProducts(prev => prev.map(p => p._id === updated._id ? updated : p));
        toast.success("Catalog updated");
        setEditingProduct(null);
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ SEARCH LOGIC: Now filters by Name, ID, AND Category Name
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p._id.includes(searchTerm) ||
    p.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log("");

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-3 md:p-10 font-sans">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-[800] text-slate-900 tracking-tight flex items-center justify-center md:justify-start gap-3">
               <Box className="text-blue-600" size={32} /> Product Repository
            </h1>
            <p className="text-slate-500 mt-1 font-medium text-sm">Active SKU Count: {products.length}</p>
          </div>

          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              className="w-full rounded-2xl border text-black border-slate-200 bg-white py-4 pl-12 pr-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
              placeholder="Search name, ID, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 gap-4 animate-pulse">
             {[1,2,3].map(i => <div key={i} className="h-40 bg-white rounded-[2rem] border border-slate-100" />)}
           </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="group relative bg-white border border-slate-100 rounded-[2rem] p-5 md:p-7 transition-all hover:shadow-xl hover:border-blue-200 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                
                {/* Image Section */}
                <div className="relative h-28 w-28 flex-shrink-0 cursor-zoom-in" onClick={() => setViewingProduct(product)}>
                  <img src={product.images?.[0] || "/placeholder.png"} className="h-full w-full object-cover rounded-2xl shadow-inner bg-slate-50 border border-slate-100" alt={product.name} />
                  {product.stock <= 5 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full animate-bounce shadow-lg">LOW STOCK</span>
                  )}
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full text-center md:text-left">
                   <h2 className="text-xl font-[800] text-slate-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setViewingProduct(product)}>
                     {product.name}
                   </h2>
                   
                   <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                      {/* ✅ FIX: Accessing category.name instead of ID */}
                      <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
                         <Tag className="w-4 h-4 text-indigo-600" />
                         <span className="text-xs font-black text-indigo-700">
                            {product.category?.name || "No Category"}
                         </span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                         <IndianRupee className="w-4 h-4 text-blue-600" />
                         <span className="text-sm font-black text-blue-700">₹{product.price}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100">
                         <Scale className="w-4 h-4 text-purple-600" />
                         <span className="text-sm font-black text-purple-700">{product.netWeight || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                         <Layers className="w-4 h-4 text-slate-400" />
                         <span className="text-sm font-bold text-slate-600">{product.stock} Units</span>
                      </div>
                   </div>
                </div>

                {/* Actions Section */}
                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-50 md:pl-8">
                  <button onClick={() => setViewingProduct(product)} className="flex-1 p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><ArrowUpRight size={20} /></button>
                  <button onClick={() => setEditingProduct(product)} className="flex-1 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-xs hover:bg-blue-600 hover:text-white transition-all">EDIT</button>
                  <button onClick={() => deleteProduct(product._id)} className="flex-1 p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- EDIT MODAL --- */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 md:p-10 shadow-2xl animate-in zoom-in duration-200 my-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-[800] text-slate-900 tracking-tight">Modify SKU</h2>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={24} className="text-slate-400" /></button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Title</label>
                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Price</label>
                  <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Weight</label>
                  <input type="text" value={editingProduct.netWeight || ""} onChange={(e) => setEditingProduct({...editingProduct, netWeight: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Stock</label>
                  <input type="number" value={editingProduct.stock} onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1 flex items-center gap-2"><FileText size={12} /> Narrative Description</label>
                <textarea rows={4} value={editingProduct.description || ""} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none leading-relaxed" />
              </div>
              
              <button type="submit" disabled={isSaving} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Changes"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- DETAIL VIEW MODAL --- */}
      {viewingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md" onClick={() => setViewingProduct(null)}>
           <div className="bg-white rounded-[3rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
              <div className="sticky top-0 bg-white/80 backdrop-blur-md px-10 py-8 flex justify-between items-center border-b border-slate-50 z-10">
                <h2 className="text-2xl font-[800] text-slate-900 tracking-tight">Product Profile</h2>
                <button onClick={() => setViewingProduct(null)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"><X size={20} className="text-slate-500" /></button>
              </div>

              <div className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="aspect-square rounded-[2rem] overflow-hidden border border-slate-100 bg-slate-50 shadow-inner">
                    <img src={viewingProduct.images?.[0] || "/placeholder.png"} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                       <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Master SKU</span>
                       <h3 className="text-3xl font-[800] text-slate-900 leading-tight">{viewingProduct.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                       <div className="px-5 py-3 bg-slate-900 rounded-[1.2rem] text-white flex-1 text-center">
                          <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest mb-1">Price</p>
                          <p className="text-lg font-black">₹{viewingProduct.price}</p>
                       </div>
                       <div className="px-5 py-3 bg-purple-600 rounded-[1.2rem] text-white shadow-xl shadow-purple-100 flex-1 text-center">
                          <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest mb-1">Weight</p>
                          <p className="text-lg font-black">{viewingProduct.netWeight || "N/A"}</p>
                       </div>
                       <div className="px-5 py-3 bg-blue-600 rounded-[1.2rem] text-white shadow-xl shadow-blue-100 flex-1 text-center">
                          <p className="text-[9px] font-bold opacity-50 uppercase tracking-widest mb-1">In Stock</p>
                          <p className="text-lg font-black">{viewingProduct.stock}</p>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-50 pt-10 text-center">
                  <div className="p-5 bg-slate-50 rounded-2xl">
                    <Hash size={16} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Serial</p>
                    <p className="text-xs font-bold text-slate-600 truncate px-2">{viewingProduct._id}</p>
                  </div>
                  <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <Tag size={16} className="text-indigo-400 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Category</p>
                    {/* ✅ FIX: Accessing category.name in Detail View */}
                    <p className="text-xs font-bold text-indigo-700">{viewingProduct.category?.name || "No Category"}</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl">
                    <Layers size={16} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Stock</p>
                    <p className="text-xs font-bold text-slate-600">{viewingProduct.stock} Left</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl">
                    <Calendar size={16} className="text-slate-300 mx-auto mb-2" />
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Added On</p>
                    <p className="text-xs font-bold text-slate-600">{new Date(viewingProduct.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} className="text-blue-600" /> Catalog Narrative
                  </h4>
                  <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      {viewingProduct.description || "No narrative indexed."}
                    </p>
                  </div>
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}