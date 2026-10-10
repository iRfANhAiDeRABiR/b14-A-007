import Link from "next/link";
import { Card, CardContent } from "@heroui/react";
import type { MarketProduct } from "@/types/market";
import { formatBengaliPrice } from "@/lib/utils/bengali";
import PriceChangeBadge from "./PriceChangeBadge";

interface ProductCardProps {
  product: MarketProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = formatBengaliPrice(product.currentPrice);

  return (
    <Link
      href={`/product/${product.id}`}
      aria-label={`${product.name} — ${product.unit} — আজকের দাম ${formattedPrice ?? "দাম পাওয়া যায়নি"}`}
      className="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e]"
    >
      <Card className="h-full border border-[#e1e8e1] bg-white hover:border-[#05893e]/50 hover:shadow-md transition-all duration-200 rounded-xl p-4">
        <CardContent className="flex flex-col justify-between gap-4 p-0 h-full">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                aria-hidden="true"
                className="w-12 h-12 rounded-xl bg-[#f0f5f0] border border-[#e1e8e1]/80 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform"
              >
                {product.emoji ?? "📦"}
              </div>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-[#1d271f] group-hover:text-[#05893e] transition-colors truncate">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#1d271f]/65 font-medium">
                  {product.unit}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#e1e8e1]/70 flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-[#1d271f]/60 font-medium mb-0.5">
                আজকের দাম
              </p>
              {formattedPrice ? (
                <p className="text-lg sm:text-xl font-bold text-[#1d271f]">
                  {formattedPrice}
                </p>
              ) : (
                <p className="text-sm font-medium text-[#1d271f]/55">
                  দাম পাওয়া যায়নি
                </p>
              )}
            </div>

            <PriceChangeBadge
              direction={product.direction}
              changePercent={product.changePercent}
              size="sm"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

