import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 101, name: "Aloo Bhujia", price: "40.00", image: "/images/namkeen-1.png" },
  // ... your namkeen data
];

export default function Page() {
  return (
    <>
      <h2 className="text-3xl font-serif text-[#711A2E] mb-8">Namkeens</h2>
      <div className="flex flex-wrap gap-6">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}