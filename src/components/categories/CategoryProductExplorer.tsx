"use client";

import { useMemo, useState } from "react";
import type { MarketProduct, SortOption } from "@/types/market";
import { formatBengaliNumber } from "@/lib/utils/bengali";
import { sortProductsByPrice } from "@/lib/utils/prices";
import ProductGrid from "@/components/products/ProductGrid";
import EmptyState from "@/components/shared/EmptyState";
import CategorySortSelect from "./CategorySortSelect";

interface CategoryProductExplorerProps {
  products: MarketProduct[];
}

export default function CategoryProductExplorer({
  products,
}: CategoryProductExplorerProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = useMemo(
    () => sortProductsByPrice(products, sortOption),
    [products, sortOption]
  );

  const countText = formatBengaliNumber(products.length) ?? "০";

  return (
    <section aria-label="ক্যাটাগরির পণ্য তালিকা" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#e1e8e1] bg-white px-4 py-3 shadow-2xs">
        <p className="text-sm sm:text-base font-semibold text-[#1d271f]">
          মোট পণ্য: <span className="text-[#05893e]">{countText}টি</span>
        </p>

        <CategorySortSelect
          value={sortOption}
          onChange={setSortOption}
          disabled={products.length <= 1}
        />
      </div>

      {sortedProducts.length > 0 ? (
        <ProductGrid products={sortedProducts} columns={3} />
      ) : (
        <EmptyState
          message="এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।"
          actionHref="/"
          actionLabel="হোম পেজে ফিরে যান"
        />
      )}
    </section>
  );
}
