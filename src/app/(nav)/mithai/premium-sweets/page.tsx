import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 501, name: "Kaju Katli Premium", price: "450.00", image: "/images/kaju-katli.png" },
  { id: 502, name: "Dry Fruit Mix", price: "600.00", image: "/images/dry-fruit.png" },
];

export default function PremiumSweetsPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}