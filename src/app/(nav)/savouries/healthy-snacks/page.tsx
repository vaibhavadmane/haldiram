import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 1, name: "Makhana Salt N Pepper", price: "169.00", image: "/images/makhana-1.png" },
  // ... rest of healthy snacks
];

export default function Page() {
  return (
    <>
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Healthy Snacking</h2>
      <div className="flex flex-wrap gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}