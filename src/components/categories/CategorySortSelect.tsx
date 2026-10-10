"use client";

import { ArrowChevronDown } from "@gravity-ui/icons";
import type { SortOption } from "@/types/market";

interface CategorySortSelectProps {
  value: SortOption;
  onChange: (nextSort: SortOption) => void;
  disabled?: boolean;
}

export default function CategorySortSelect({
  value,
  onChange,
  disabled = false,
}: CategorySortSelectProps) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <label
        htmlFor="category-sort-select"
        className="text-sm font-semibold text-[#1d271f] whitespace-nowrap"
      >
        সাজান:
      </label>

      <div className="relative">
        <select
          id="category-sort-select"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value as SortOption)}
          aria-label="পণ্যের দাম অনুযায়ী সাজান"
          className="appearance-none rounded-lg border border-[#e1e8e1] bg-white pl-3.5 pr-9 py-2 text-sm font-semibold text-[#1d271f] shadow-2xs transition-colors hover:border-[#05893e]/60 focus:outline-none focus:ring-2 focus:ring-[#05893e] disabled:opacity-50 cursor-pointer"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low-high">দাম: কম থেকে বেশি</option>
          <option value="price-high-low">দাম: বেশি থেকে কম</option>
        </select>

        <ArrowChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1d271f]/70"
        />
      </div>
    </div>
  );
}
