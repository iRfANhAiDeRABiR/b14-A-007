import type { MarketProduct } from "@/types/market";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: MarketProduct[];
  columns?: 3 | 4;
}

export default function ProductGrid({
  products,
  columns = 4,
}: ProductGridProps) {
  const gridColsClass =
    columns === 3
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";

  return (
    <div className={gridColsClass}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
