import type { MarketProduct } from "@/types/market";
import SectionHeading from "@/components/shared/SectionHeading";
import EmptyState from "@/components/shared/EmptyState";
import ProductGrid from "@/components/products/ProductGrid";

interface AllProductsSectionProps {
  products: MarketProduct[];
}

export default function AllProductsSection({
  products,
}: AllProductsSectionProps) {
  return (
    <section
      id="সব-পণ্য"
      aria-labelledby="all-products-heading"
      className="scroll-mt-24 pt-2"
    >
      <SectionHeading
        id="all-products-heading"
        title="সব পণ্য"
        subtitle="নিত্যপ্রয়োজনীয় সব পণ্যের সর্বশেষ বাজারদর এক জায়গায় দেখুন।"
      />

      {products.length > 0 ? (
        <ProductGrid products={products} columns={4} />
      ) : (
        <EmptyState message="এই মুহূর্তে কোনো পণ্যের তথ্য পাওয়া যায়নি।" />
      )}
    </section>
  );
}
