import type { MarketProduct } from "@/types/market";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import ProductGrid from "@/components/products/ProductGrid";

interface PriceFallersSectionProps {
  products: MarketProduct[];
}

export default function PriceFallersSection({
  products,
}: PriceFallersSectionProps) {
  return (
    <section aria-labelledby="price-fallers-heading">
      <SectionHeading
        id="price-fallers-heading"
        title="আজ দাম কমেছে ▼"
        subtitle="আজকের বাজারে যেসব পণ্যের দাম তুলনামূলক কমেছে"
      />

      {products.length > 0 ? (
        <ProductGrid products={products} columns={3} />
      ) : (
        <EmptyState message="আজ দাম কমেছে এমন কোনো পণ্যের তথ্য পাওয়া যায়নি।" />
      )}
    </section>
  );
}
