import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 401, name: "Motichoor Ladoo", price: "180.00", image: "/images/motichoor.png" },
  { id: 402, name: "Besan Ladoo", price: "200.00", image: "/images/besan-ladoo.png" },
];

export default function LadooPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}