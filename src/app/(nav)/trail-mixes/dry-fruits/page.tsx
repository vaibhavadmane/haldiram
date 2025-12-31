import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 1001, name: "Premium Almonds (Badam)", price: "450.00", image: "/images/trail/almonds.png" },
  { id: 1002, name: "Salted Pistachios", price: "520.00", image: "/images/trail/pistachios.png" },
  { id: 1003, name: "Cashew Nuts (Kaju) W240", price: "480.00", image: "/images/trail/cashew.png" },
];

export default function DryFruitsPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}