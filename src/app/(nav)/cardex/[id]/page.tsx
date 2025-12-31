"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronRight, Heart, Share2, Plus, Minus, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

const ProductExplorer: React.FC = () => {
  const params = useParams(); 
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'specification'>('ingredients');
  const [isAdding, setIsAdding] = useState(false);

  const primaryColor = "#922367";

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        const found = data.find((p: any) => p._id.toString() === params.id);
        setProduct(found);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProductDetails();
  }, [params.id]);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, quantity }),
      });
      if (res.ok) {
        toast.success(`${quantity} ${product.name} added to cart!`);
      }
    } catch (err) {
      toast.error("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!product) return <div className="h-screen flex items-center justify-center">Product Not Found</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans text-gray-800">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
    <Link href='/'>    <span>Home</span> </Link><ChevronRight size={14} />
       <span>{product.category?.name || 'Category'}</span> <ChevronRight size={14} />
        <span className="font-medium text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 items-center">
            <button className="p-1 border rounded-full text-amber-600 border-amber-600"><ChevronUp size={20} /></button>
            {product.images?.map((img: string, i: number) => (
              <div key={i} className="w-20 h-20 border border-gray-300 rounded-md relative overflow-hidden bg-white">
                <Image src={img} alt="" fill className="object-contain p-2" />
              </div>
            ))}
            <button className="p-1 border rounded-full text-amber-600 border-amber-600"><ChevronDown size={20} /></button>
          </div>
          
          <div className="flex-1 border border-gray-300 rounded-md bg-white aspect-square relative">
             <Image src={product.images?.[0]} alt={product.name} fill className="object-contain p-8" />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-start">
            <h1 style={{ color: primaryColor }} className="text-4xl font-serif font-medium uppercase">
              {product.name}
            </h1>
            <div className="flex gap-2">
              <button className="p-2 border rounded-md hover:bg-gray-50"><Share2 size={20} /></button>
              <button className="p-2 border rounded-md hover:bg-gray-50 text-red-500"><Heart size={20} /></button>
            </div>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-light">₹{product.price}</span>
            <span className="text-xs text-gray-500 ml-2">(Inclusive of all taxes)</span>
          </div>

          <div className="flex gap-8 mt-8">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Net Weight</label>
              <div className="border border-gray-300 rounded-md p-3 text-center">
                {product.weight || "100g"}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="border border-gray-300 rounded-md p-2 flex justify-between items-center">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={18} /></button>
                <span className="font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={18} /></button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 py-4 rounded-md text-white font-bold uppercase tracking-widest disabled:opacity-50 transition-opacity" 
              style={{ backgroundColor: primaryColor }}
            >
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>
            <button className="flex-1 py-4 border-2 rounded-md font-bold uppercase tracking-widest border-gray-400 hover:bg-gray-50 transition-colors">
              Continue Shopping
            </button>
          </div>

          <div className="mt-12">
            <div className="flex border-b border-gray-200">
              <button onClick={() => setActiveTab('ingredients')} className={`pb-2 pr-8 uppercase font-bold text-sm transition-all ${activeTab === 'ingredients' ? 'border-b-2 border-amber-600 text-gray-900' : 'text-gray-400'}`}>Ingredients</button>
              <button onClick={() => setActiveTab('specification')} className={`pb-2 px-8 uppercase font-bold text-sm transition-all ${activeTab === 'specification' ? 'border-b-2 border-amber-600 text-gray-900' : 'text-gray-400'}`}>Specification</button>
            </div>
            <div className="py-6 text-sm leading-relaxed text-gray-700">
              {activeTab === 'ingredients' ? (product.ingredients || "Ingredients info not available.") : (product.description || "Specifications info not available.")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductExplorer;