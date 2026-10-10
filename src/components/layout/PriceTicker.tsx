import type { TickerProductItem } from "@/types/market";
import {
  formatBengaliNumber,
  formatBengaliPercentage,
} from "@/lib/utils/bengali";

interface PriceTickerProps {
  items?: TickerProductItem[];
  isLoading?: boolean;
}

function getDirectionBadge(item: TickerProductItem) {
  const formattedPct = formatBengaliPercentage(item.changePercent);

  if (item.direction === "up" && formattedPct) {
    return {
      symbol: "▲",
      pctText: formattedPct,
      className: "text-[#1a9951] bg-[#f3fbf4] border border-[#1a9951]/20",
    };
  }

  if (item.direction === "down" && formattedPct) {
    return {
      symbol: "▼",
      pctText: formattedPct,
      className: "text-[#d03739] bg-[#fff6f5] border border-[#d03739]/20",
    };
  }

  if (item.direction === "unchanged") {
    return {
      symbol: "—",
      pctText: formattedPct ?? "০.০%",
      className: "text-[#1d271f]/65 bg-[#e1e8e1]/60 border border-[#e1e8e1]",
    };
  }

  return null;
}

export default function PriceTicker({
  items = [],
  isLoading = false,
}: PriceTickerProps) {
  const validItems = items.filter((item) => item.price !== null);

  if (isLoading) {
    return (
      <section
        aria-label="লাইভ বাজারদর টিকার লোড হচ্ছে"
        className="w-full border-b border-[#e1e8e1] bg-[#f0f5f0] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-6 overflow-hidden">
          <div className="h-5 w-44 rounded bg-[#e1e8e1] animate-pulse shrink-0" />
          <div className="h-5 w-48 rounded bg-[#e1e8e1] animate-pulse shrink-0" />
          <div className="h-5 w-40 rounded bg-[#e1e8e1] animate-pulse shrink-0 hidden sm:block" />
          <div className="h-5 w-44 rounded bg-[#e1e8e1] animate-pulse shrink-0 hidden md:block" />
        </div>
      </section>
    );
  }

  if (validItems.length === 0) {
    return (
      <section
        aria-label="বাজারদর আপডেট বার্তা"
        className="w-full border-b border-[#e1e8e1] bg-[#f0f5f0] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-xs sm:text-sm text-[#1d271f]/80">
          <div className="flex items-center gap-2 font-medium">
            <span
              aria-hidden="true"
              className="inline-block w-2 h-2 rounded-full bg-[#05893e]"
            />
            <span>এই মুহূর্তে টিকারে দেখানোর মতো বাজারদর পাওয়া যায়নি</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="সর্বশেষ বাজারদর টিকার"
      className="w-full border-b border-[#e1e8e1] bg-[#f0f5f0] overflow-hidden py-2"
    >
      <div className="ticker-track items-center">
        {[0, 1].map((copyIndex) => (
          <div
            key={copyIndex}
            aria-hidden={copyIndex === 1 ? "true" : undefined}
            className="flex items-center gap-6 px-3 shrink-0"
          >
            {validItems.map((item) => {
              const formattedPrice = formatBengaliNumber(item.price, {
                maximumFractionDigits: 2,
              });
              if (!formattedPrice) {
                return null;
              }

              const badge = getDirectionBadge(item);

              return (
                <div
                  key={`${copyIndex}-${item.id}`}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1d271f] whitespace-nowrap"
                >
                  <span aria-hidden="true" className="text-base">
                    {item.emoji ?? "📦"}
                  </span>
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-[#1d271f]/50">—</span>
                  <span>
                    {formattedPrice} টাকা/{item.unit}
                  </span>
                  {badge ? (
                    <span
                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold ${badge.className}`}
                    >
                      <span aria-hidden="true">{badge.symbol}</span>
                      <span>{badge.pctText}</span>
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
