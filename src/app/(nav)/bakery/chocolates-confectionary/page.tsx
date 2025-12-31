import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 701, name: "Dark Chocolate Truffle", price: "450.00", image: "/images/bakery/truffle.png" },
  { id: 702, name: "Assorted Milk Chocolates", price: "500.00", image: "/images/bakery/assorted.png" },
  { id: 703, name: "Caramel Toffee Pouch", price: "220.00", image: "/images/bakery/toffee.png" },
];

export default function ChocolatesPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}