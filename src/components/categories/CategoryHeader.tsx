import Link from "next/link";
import type { CategoryItem } from "@/types/market";

interface CategoryHeaderProps {
  category: CategoryItem;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="space-y-4">
      <nav
        aria-label="ব্রেডক্রাম্ব"
        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#1d271f]/65 font-medium"
      >
        <Link
          href="/"
          className="hover:text-[#05893e] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] rounded"
        >
          হোম
        </Link>
        <span aria-hidden="true">/</span>
        <span>ক্যাটাগরি</span>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-[#1d271f] font-semibold">
          {category.name}
        </span>
      </nav>

      <div className="rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8 shadow-2xs flex items-center gap-4">
        <div
          aria-hidden="true"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f0f5f0] border border-[#e1e8e1] flex items-center justify-center text-3xl sm:text-4xl shrink-0"
        >
          {category.icon ?? "📦"}
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
            {category.name}
          </h1>
          <p className="text-sm sm:text-base text-[#1d271f]/70">
            {category.name} ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর দেখুন।
          </p>
        </div>
      </div>
    </div>
  );
}
