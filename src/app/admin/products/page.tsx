"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [form, setForm] = useState<any>({});
  const [images, setImages] = useState<File[]>([]);
const [previews, setPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/products").then(res => res.json()).then(setProducts);
    fetch("/api/categories/tree").then(res => res.json()).then(setCategories);
  }, []);

  const subCategories =
    categories.find(c => c._id === selectedParent)?.children || [];

  const addProduct = async () => {
    try {
      setLoading(true);
      let imageUrls: string[] = [];

      // ✅ Upload multiple images
      if (images.length > 0) {
        const formData = new FormData();
        images.forEach(img => formData.append("images", img));

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        imageUrls = uploadData.urls;
      }

      // ✅ Create product
      await fetch("/api/admin/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          images: imageUrls,
        }),
      });

      location.reload();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 " +
    "placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Product Management
        </h1>
        <p className="text-sm text-gray-600">
          Add and manage products in your store
        </p>
      </div>

      {/* Add Product */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6">
        <h2 className="mb-4 text-lg font-medium text-gray-800">
          Add New Product
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              className={inputClass}
              placeholder="Motichoor Ladoo"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder="450"
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              className={inputClass}
              placeholder="25"
              onChange={e => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Category
            </label>
            <select
              className={`${inputClass} cursor-pointer`}
              onChange={e => {
                setSelectedParent(e.target.value);
                setForm({ ...form, category: "" });
              }}
            >
              <option value="">Select Parent Category</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sub Category
            </label>
            <select
              disabled={!selectedParent}
              className={`${inputClass} cursor-pointer disabled:bg-gray-100 disabled:text-gray-400`}
              onChange={e =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option value="">Select Sub Category</option>
              {subCategories.map((sc: any) => (
                <option key={sc._id} value={sc._id}>
                  {sc.name}
                </option>
              ))}
            </select>
          </div>
{/* Images */}
<div className="md:col-span-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Product Images (Multiple)
  </label>

  <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-4">
    <input
      type="file"
      multiple
      accept="image/*"
      className="block w-full text-sm text-gray-700
                 file:mr-4 file:rounded-md file:border-0
                 file:bg-blue-600 file:px-4 file:py-2
                 file:text-sm file:font-semibold file:text-white
                 hover:file:bg-blue-700 cursor-pointer"
      onChange={e => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        setImages((prev: File[]) => [...prev, ...files]);

        const newPreviews = files.map(file =>
          URL.createObjectURL(file)
        );
        setPreviews(prev => [...prev, ...newPreviews]);

        e.target.value = "";
      }}
    />
  </div>

  <p className="mt-1 text-xs text-gray-500">
    Select multiple images. Selecting again will add more images.
  </p>

  {/* Preview */}
  {previews.length > 0 && (
    <div className="mt-4 flex flex-wrap gap-3">
      {previews.map((src, idx) => (
        <img
          key={idx}
          src={src}
          className="h-20 w-20 rounded-md border object-cover"
          alt="preview"
        />
      ))}
    </div>
  )}
</div>


          {/* Button */}
          <div className="flex items-end md:col-span-3">
            <button
              disabled={loading}
              onClick={addProduct}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white
                         hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Uploading..." : "+ Add Product"}
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left text-gray-700">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Images</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{p.name}</td>
                  <td className="px-4 py-3">₹{p.price}</td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3 flex gap-2">
                    {p.images?.slice(0, 3).map((img: string, i: number) => (
                      <img
                        key={i}
                        src={img}
                        className="h-10 w-10 rounded border object-cover"
                        alt={p.name}
                      />
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
