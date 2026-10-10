import type { PriceDirection } from "@/types/market";
import { formatBengaliPercentage } from "@/lib/utils/bengali";

interface PriceChangeBadgeProps {
  direction: PriceDirection;
  changePercent: number | null;
  size?: "sm" | "md";
}

export default function PriceChangeBadge({
  direction,
  changePercent,
  size = "md",
}: PriceChangeBadgeProps) {
  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-xs"
      : "px-2.5 py-1 text-xs sm:text-sm";

  const formattedPct = formatBengaliPercentage(changePercent);

  if (direction === "up" && formattedPct) {
    return (
      <span
        aria-label={`দাম বেড়েছে ${formattedPct}`}
        className={`inline-flex items-center gap-1 rounded-full font-semibold bg-[#f3fbf4] text-[#1a9951] border border-[#1a9951]/20 whitespace-nowrap ${sizeClasses}`}
      >
        <span aria-hidden="true">▲</span>
        <span>{formattedPct}</span>
      </span>
    );
  }

  if (direction === "down" && formattedPct) {
    return (
      <span
        aria-label={`দাম কমেছে ${formattedPct}`}
        className={`inline-flex items-center gap-1 rounded-full font-semibold bg-[#fff6f5] text-[#d03739] border border-[#d03739]/20 whitespace-nowrap ${sizeClasses}`}
      >
        <span aria-hidden="true">▼</span>
        <span>{formattedPct}</span>
      </span>
    );
  }

  if (direction === "unchanged") {
    return (
      <span
        aria-label="দাম অপরিবর্তিত ০.০%"
        className={`inline-flex items-center gap-1 rounded-full font-semibold bg-[#f0f5f0] text-[#1d271f]/70 border border-[#e1e8e1] whitespace-nowrap ${sizeClasses}`}
      >
        <span aria-hidden="true">—</span>
        <span>{formattedPct ?? "০.০%"}</span>
      </span>
    );
  }

  return (
    <span
      aria-label="পরিবর্তনের তথ্য পাওয়া যায়নি"
      className={`inline-flex items-center gap-1 rounded-full font-medium bg-[#f0f5f0] text-[#1d271f]/55 border border-[#e1e8e1] whitespace-nowrap ${sizeClasses}`}
    >
      <span>তথ্য নেই</span>
    </span>
  );
}

