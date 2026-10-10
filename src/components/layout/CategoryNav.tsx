"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CategoryItem } from "@/types/market";

interface CategoryNavProps {
  categories?: CategoryItem[];
  isLoading?: boolean;
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
}

export default function CategoryNav({
  categories = [],
  isLoading = false,
  onNavigate,
  orientation = "horizontal",
}: CategoryNavProps) {
  const pathname = usePathname();
  const isAllProductsActive = pathname === "/";
  const isVertical = orientation === "vertical";

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি নেভিগেশন"
      className={
        isVertical
          ? "flex flex-col gap-1.5 w-full"
          : "flex flex-wrap items-center gap-1.5 sm:gap-2"
      }
    >
      <Link
        href="/"
        onClick={onNavigate}
        aria-current={isAllProductsActive ? "page" : undefined}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] ${
          isAllProductsActive
            ? "bg-[#05893e] text-[#f3fbf4] shadow-xs"
            : "text-[#1d271f] hover:bg-[#f0f5f0] hover:text-[#05893e]"
        }`}
      >
        <span>সব পণ্য</span>
      </Link>

      {isLoading ? (
        <div
          aria-label="ক্যাটাগরি লোড হচ্ছে"
          className={
            isVertical
              ? "flex flex-col gap-2 pt-1"
              : "flex items-center gap-2"
          }
        >
          <span className="h-8 w-20 rounded-full bg-[#e1e8e1]/70 animate-pulse" />
          <span className="h-8 w-24 rounded-full bg-[#e1e8e1]/70 animate-pulse" />
          <span className="h-8 w-16 rounded-full bg-[#e1e8e1]/70 animate-pulse" />
        </div>
      ) : categories.length > 0 ? (
        categories.map((category) => {
          const href = `/category/${category.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={category.slug}
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] ${
                isActive
                  ? "bg-[#05893e] text-[#f3fbf4] font-semibold shadow-xs"
                  : "text-[#1d271f]/85 hover:bg-[#f0f5f0] hover:text-[#05893e]"
              }`}
            >
              {category.icon ? (
                <span aria-hidden="true">{category.icon}</span>
              ) : null}
              <span>{category.name}</span>
            </Link>
          );
        })
      ) : (
        <span className="px-3 py-1 rounded-full text-xs font-medium text-[#1d271f]/60 bg-[#f0f5f0] border border-[#e1e8e1]">
          ক্যাটাগরি শীঘ্রই যুক্ত হবে
        </span>
      )}
    </nav>
  );
}

