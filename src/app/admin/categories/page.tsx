"use client";
import { useEffect, useState } from "react";
import { Layers, Plus, FolderPlus, Tag, ChevronRight, LayoutGrid } from "lucide-react";
import toast from "react-hot-toast";
export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch("/api/categories/tree");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!name) return alert("Please enter a category name");
    
    setIsSubmitting(true);
    try {
      await fetch("/api/admin/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, parent: parent || null }),
      });
      setName("");
      setParent("");
      await fetchCategories(); // Refresh list without reload
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-4 md:p-10 font-sans">
      <div className="mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-lg shadow-indigo-100">
            <LayoutGrid className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Product Taxonomy
            </h1>
            <p className="text-slate-500 text-sm">
              Organize your store by creating a hierarchy of categories.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <FolderPlus className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-slate-800">Add Category</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                    Category Name
                  </label>
                  <div className="relative">
                    <Tag className="absolute  left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={name}
                      placeholder="e.g. Mithai, Bakery"
                      className="w-full bg-slate-50 text-semibold text-black   rounded-xl border-none ring-1 ring-slate-200 px-10 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                    Relationship
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={parent}
                      className="w-full text-semibold text-black   bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 px-10 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
                      onChange={e => setParent(e.target.value)}
                    >
                      <option value="">Set as Main Category</option>
                      {categories.map(c => (
                        <option key={c._id} value={c._id}>
                           {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={addCategory}
                  disabled={isSubmitting}
                  className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white hover:bg-indigo-600 transition-all disabled:bg-slate-300 shadow-xl shadow-indigo-100"
                >
                  {isSubmitting ? "Processing..." : <><Plus className="w-4 h-4" /> Create Category</>}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: List Preview */}
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 ml-2">
              Current Structure
            </h3>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              {categories.length === 0 ? (
                <div className="p-10 text-center text-slate-400 italic">
                  No categories found. Start by adding one.
                </div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {categories.map((cat) => (
                    <CategoryItem key={cat._id} category={cat} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function CategoryItem({ category }: { category: any }) {
  return (
    <div className="group">
      <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-default">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-700">{category.name}</span>
        </div>
        {category.parent && (
          <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 text-slate-400 uppercase">
            Sub
          </span>
        )}
      </div>
    </div>
  );
}