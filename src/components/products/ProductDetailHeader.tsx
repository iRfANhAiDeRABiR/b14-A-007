import Link from "next/link";
import { Card, CardContent } from "@heroui/react";
import { ArrowChevronRight } from "@gravity-ui/icons";
import type { ProductDetail } from "@/types/market";
import { formatBengaliNumber, formatBengaliPrice } from "@/lib/utils/bengali";
import PriceChangeBadge from "./PriceChangeBadge";

interface ProductDetailHeaderProps {
  product: ProductDetail;
}

export default function ProductDetailHeader({
  product,
}: ProductDetailHeaderProps) {
  const formattedPriceNumber = formatBengaliNumber(product.currentPrice, {
    maximumFractionDigits: 2,
  });
  const formattedFullPrice = formatBengaliPrice(product.currentPrice);
  const hasValidCategoryLink = Boolean(
    product.categorySlug && /^[a-zA-Z0-9_-]+$/.test(product.categorySlug)
  );

  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label="ব্রেডক্রাম্ব নেভিগেশন"
        className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#1d271f]/65"
      >
        <Link
          href="/"
          className="font-medium hover:text-[#05893e] transition-colors"
        >
          হোম
        </Link>
        <ArrowChevronRight
          className="w-3.5 h-3.5 text-[#1d271f]/40 shrink-0"
          aria-hidden="true"
        />
        <Link
          href="/#সব-পণ্য"
          className="font-medium hover:text-[#05893e] transition-colors"
        >
          সব পণ্য
        </Link>

        {product.categoryName ? (
          <>
            <ArrowChevronRight
              className="w-3.5 h-3.5 text-[#1d271f]/40 shrink-0"
              aria-hidden="true"
            />
            {hasValidCategoryLink ? (
              <Link
                href={`/category/${product.categorySlug}`}
                className="font-medium hover:text-[#05893e] transition-colors"
              >
                {product.categoryName}
              </Link>
            ) : (
              <span className="font-medium">{product.categoryName}</span>
            )}
          </>
        ) : null}

        <ArrowChevronRight
          className="w-3.5 h-3.5 text-[#1d271f]/40 shrink-0"
          aria-hidden="true"
        />
        <span
          aria-current="page"
          className="font-semibold text-[#1d271f] truncate max-w-[220px] sm:max-w-none"
        >
          {product.name}
        </span>
      </nav>

      <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4 min-w-0">
              <div
                aria-hidden="true"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f0f5f0] border border-[#e1e8e1]/80 flex items-center justify-center text-3xl sm:text-4xl shrink-0"
              >
                {product.emoji ?? "📦"}
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1d271f] leading-tight break-words">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#1d271f]/75">
                  <span className="font-medium">{product.unit}</span>

                  {product.categoryName ? (
                    <>
                      <span aria-hidden="true" className="text-[#1d271f]/35">
                        ·
                      </span>
                      {hasValidCategoryLink ? (
                        <Link
                          href={`/category/${product.categorySlug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-[#e2f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#05893e] hover:bg-[#05893e] hover:text-white transition-colors"
                        >
                          {product.categoryIcon ? (
                            <span aria-hidden="true">
                              {product.categoryIcon}
                            </span>
                          ) : null}
                          <span>{product.categoryName}</span>
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#e2f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#05893e]">
                          {product.categoryIcon ? (
                            <span aria-hidden="true">
                              {product.categoryIcon}
                            </span>
                          ) : null}
                          <span>{product.categoryName}</span>
                        </span>
                      )}
                    </>
                  ) : null}
                </div>

                <p className="text-xs sm:text-sm text-[#1d271f]/65 leading-relaxed pt-0.5">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f0f5f0] border border-[#e1e8e1]/80 px-5 py-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 md:min-w-[165px] shrink-0">
              <div className="flex flex-col md:items-center">
                <span className="text-xs font-semibold text-[#1d271f]/65">
                  আজকের দাম
                </span>
                {formattedPriceNumber && formattedFullPrice ? (
                  <>
                    <span className="text-2xl sm:text-3xl font-bold text-[#1d271f] leading-tight mt-0.5">
                      {formattedPriceNumber} টাকা
                    </span>
                    <span className="text-xs font-medium text-[#1d271f]/60">
                      টাকা / {product.shortUnit}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-[#1d271f]/60 mt-1">
                    দামের তথ্য পাওয়া যায়নি।
                  </span>
                )}
              </div>

              <PriceChangeBadge
                direction={product.direction}
                changePercent={product.changePercent}
                size="md"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

