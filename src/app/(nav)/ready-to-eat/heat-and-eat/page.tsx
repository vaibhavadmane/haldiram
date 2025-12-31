import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 901, name: "Dal Makhani (Heat & Eat)", price: "180.00", image: "/images/ready/dal.png" },
  { id: 902, name: "Paneer Butter Masala", price: "210.00", image: "/images/ready/paneer.png" },
];

export default function HeatAndEatPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}