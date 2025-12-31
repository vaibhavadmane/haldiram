import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 301, name: "Desi Ghee Soan Papdi", price: "250.00", image: "/images/soan-papdi.png" },
  { id: 302, name: "Mysore Pak", price: "320.00", image: "/images/mysore-pak.png" },
];

export default function GheeSweetsPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}