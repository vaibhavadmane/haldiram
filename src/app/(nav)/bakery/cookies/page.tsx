import { ProductCard } from '@/components/ProductCard';

const products = [
  { id: 601, name: "Atta Cookies", price: "120.00", image: "/images/bakery/atta-cookies.png" },
  { id: 602, name: "Coconut Crunch", price: "140.00", image: "/images/bakery/coconut-cookies.png" },
  { id: 603, name: "Oatmeal Cookies", price: "150.00", image: "/images/bakery/oatmeal.png" },
];

export default function CookiesPage() {
  return (
    <div className="flex flex-wrap gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}