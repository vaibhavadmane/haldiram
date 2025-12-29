"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  Hash, Trash2, Edit, Search, Box, DollarSign, 
  Layers, Copy, Check, X, Loader2 
} from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Logic states for Edit/Delete
  const [editingProduct, setEditingProduct] = useState<any>(null);
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
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ✅ DELETE FUNCTIONALITY
  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
        toast.success("Product deleted successfully!"); //
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product."); //
    }
  };

  // ✅ EDIT (UPDATE) FUNCTIONALITY
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
        toast.success("Changes saved!"); //
        setEditingProduct(null);
      }
    } catch (error) {
      toast.error("Could not save changes."); //
    } finally {
      setIsSaving(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p._id.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 md:p-10 font-sans">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Box className="w-8 h-8 text-indigo-600" /> PRODUCT REPOSITORY
            </h1>
            <p className="text-slate-500 font-medium text-sm">Active Inventory: {products.length}</p>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              className="w-full bg-white border-none shadow-sm rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              placeholder="Search by name or serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
           <div className="grid grid-cols-1 gap-4 animate-pulse">
             {[1,2,3].map(i => <div key={i} className="h-40 bg-white rounded-3xl" />)}
           </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div 
                key={product._id} 
                className="group relative bg-white border border-slate-200 rounded-[2rem] p-4 md:p-6 transition-all hover:shadow-xl hover:shadow-indigo-100 hover:border-indigo-100 flex flex-col md:flex-row items-center gap-6"
              >
                {/* Image */}
                <div className="relative h-28 w-28 flex-shrink-0">
                  <img 
                    src={product.images?.[0] || "/placeholder.png"} 
                    className="h-full w-full object-cover rounded-2xl shadow-inner bg-slate-50"
                    alt=""
                  />
                  {product.stock <= 5 && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg animate-bounce">LOW STOCK</span>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 w-full text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-slate-800">{product.name}</h2>
                    <span className="hidden md:block text-slate-300">|</span>
                    <div className="flex items-center justify-center md:justify-start gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 w-fit self-center md:self-auto">
                      <Hash className="w-3 h-3 text-indigo-500" />
                      <code className="text-[11px] font-mono font-bold text-slate-500 tracking-tighter">{product._id}</code>
                      <button onClick={() => copyToClipboard(product._id)} className="ml-1 text-slate-400 hover:text-indigo-600 transition-colors">
                        {copiedId === product._id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold">₹{product.price}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Layers className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-bold">{product.stock} Units</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                  <button 
                    onClick={() => setEditingProduct(product)}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button 
                    onClick={() => deleteProduct(product._id)}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs hover:bg-rose-600 hover:text-white transition-all"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- EDIT MODAL --- */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-slate-900">Modify Product</h2>
              <button onClick={() => setEditingProduct(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                <input 
                  type="text" 
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="w-full mt-1 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Price (₹)</label>
                  <input type="number" 
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                    className="w-full mt-1 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Inventory</label>
                  <input 
                    type="number" 
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                    className="w-full mt-1 bg-slate-50 border-none ring-1 ring-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full py-4 mt-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}