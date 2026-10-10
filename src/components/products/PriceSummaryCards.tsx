import { Card, CardContent } from "@heroui/react";
import { ArrowDown, ArrowUp, ScalesBalanced } from "@gravity-ui/icons";
import type { ProductPriceSummary } from "@/types/market";
import { formatBengaliPrice } from "@/lib/utils/bengali";

interface PriceSummaryCardsProps {
  priceSummary: ProductPriceSummary;
  unit: string;
}

export default function PriceSummaryCards({
  priceSummary,
  unit,
}: PriceSummaryCardsProps) {
  const minPriceText = formatBengaliPrice(priceSummary.minPrice);
  const maxPriceText = formatBengaliPrice(priceSummary.maxPrice);
  const averagePriceText = formatBengaliPrice(priceSummary.averagePrice);

  const cards = [
    {
      id: "min-price",
      label: "সর্বনিম্ন দাম",
      price: minPriceText,
      subtitle: priceSummary.lowestMarketName
        ? `সবচেয়ে কম দামের বাজার · ${priceSummary.lowestMarketName}`
        : "সবচেয়ে কম দামের বাজার",
      icon: ArrowDown,
      iconClassName: "bg-[#e2f5e9] text-[#05893e]",
    },
    {
      id: "max-price",
      label: "সর্বোচ্চ দাম",
      price: maxPriceText,
      subtitle: priceSummary.highestMarketName
        ? `সবচেয়ে বেশি দামের বাজার · ${priceSummary.highestMarketName}`
        : "সবচেয়ে বেশি দামের বাজার",
      icon: ArrowUp,
      iconClassName: "bg-[#fde8e8] text-[#c81e1e]",
    },
    {
      id: "avg-price",
      label: "গড় দাম",
      price: averagePriceText,
      subtitle: `${unit}-এর হিসাবে`,
      icon: ScalesBalanced,
      iconClassName: "bg-[#f0f5f0] text-[#1d271f]/80",
    },
  ];

  return (
    <section aria-labelledby="price-summary-heading" className="flex flex-col gap-3.5">
      <h2
        id="price-summary-heading"
        className="text-base sm:text-lg font-bold text-[#1d271f]"
      >
        দামের সারসংক্ষেপ
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {cards.map((card) => {
          const IconComponent = card.icon;
          return (
            <Card
              key={card.id}
              className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs"
            >
              <CardContent className="p-4 sm:p-5 flex flex-col justify-between gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-semibold text-[#1d271f]/70">
                    {card.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${card.iconClassName}`}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </span>
                </div>

                {card.price ? (
                  <p className="text-xl sm:text-2xl font-bold text-[#1d271f] leading-tight">
                    {card.price}
                  </p>
                ) : (
                  <p className="text-sm sm:text-base font-semibold text-[#1d271f]/55 py-1">
                    তথ্য পাওয়া যায়নি
                  </p>
                )}

                <p className="text-xs font-medium text-[#1d271f]/60 truncate">
                  {card.subtitle}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

