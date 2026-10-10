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
  const isVertical = orientation === "vertical";

  if (isLoading) {
    return (
      <nav
        aria-label="ক্যাটাগরি লোড হচ্ছে"
        className={
          isVertical
            ? "flex flex-col gap-2 w-full"
            : "flex items-center gap-5 py-1"
        }
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="h-6 w-16 rounded-md bg-[#e1e8e1]/70 animate-pulse"
          />
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি নেভিগেশন"
      className={
        isVertical
          ? "flex flex-col gap-1.5 w-full"
          : "flex flex-wrap items-center gap-3 sm:gap-5"
      }
    >
      {categories.length > 0 ? (
        categories.map((category) => {
          const href = `/category/${category.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={category.slug}
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] ${
                isActive
                  ? "bg-[#e2f5e9] text-[#05893e] font-bold"
                  : "font-semibold text-[#1d271f] hover:bg-[#f0f5f0] hover:text-[#05893e]"
              }`}
            >
              {category.icon ? (
                <span aria-hidden="true" className="text-base leading-none">
                  {category.icon}
                </span>
              ) : null}
              <span>{category.name}</span>
            </Link>
          );
        })
      ) : (
        <Link
          href="/"
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-semibold text-[#05893e]"
        >
          <span>সব পণ্য</span>
        </Link>
      )}
    </nav>
  );
}
