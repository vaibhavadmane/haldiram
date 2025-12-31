import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 801, name: "Poha Cup Meal", price: "80.00", image: "/images/ready/poha.png" },
  { id: 802, name: "Upma Cup Meal", price: "80.00", image: "/images/ready/upma.png" },
];

export default function CupMealPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}