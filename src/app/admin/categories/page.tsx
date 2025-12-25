"use client";
import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  useEffect(() => {
    fetch("/api/categories/tree")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  const addCategory = async () => {
    await fetch("/api/admin/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, parent: parent || null }),
    });
    location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Category Management
        </h1>
        <p className="text-sm text-gray-500">
          Create and manage main categories & sub-categories
        </p>
      </div>

      {/* Add Category Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Add New Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category Name
            </label>
            <input
              type="text"
              placeholder="e.g. Mithai, Bakery"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Parent Category
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setParent(e.target.value)}
            >
              <option value="">Main Category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="flex items-end">
            <button
              onClick={addCategory}
              className="w-full md:w-auto rounded-lg bg-green-600 px-6 py-2
                         text-sm font-medium text-white
                         hover:bg-green-700 transition"
            >
              + Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
