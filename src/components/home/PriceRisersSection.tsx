import type { MarketProduct } from "@/types/market";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import ProductGrid from "@/components/products/ProductGrid";

interface PriceRisersSectionProps {
  products: MarketProduct[];
}

export default function PriceRisersSection({
  products,
}: PriceRisersSectionProps) {
  return (
    <section aria-labelledby="price-risers-heading">
      <SectionHeading
        id="price-risers-heading"
        title="আজ দাম বেড়েছে ▲"
        subtitle="আজকের বাজারে যেসব পণ্যের দাম তুলনামূলক বেড়েছে"
      />

      {products.length > 0 ? (
        <ProductGrid products={products} columns={3} />
      ) : (
        <EmptyState message="আজ দাম বেড়েছে এমন কোনো পণ্যের তথ্য পাওয়া যায়নি।" />
      )}
    </section>
  );
}
