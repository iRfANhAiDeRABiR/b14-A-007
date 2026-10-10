import type { MarketEntry } from "@/types/market";
import { formatBengaliPrice } from "@/lib/utils/bengali";

interface MarketPriceListProps {
  markets: MarketEntry[];
  unit: string;
}

export default function MarketPriceList({
  markets,
  unit,
}: MarketPriceListProps) {
  return (
    <section
      aria-labelledby="market-price-list-heading"
      className="flex flex-col gap-3.5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2
          id="market-price-list-heading"
          className="text-base sm:text-lg font-bold text-[#1d271f]"
        >
          বাজারভিত্তিক আজকের দাম
        </h2>
        <span className="text-xs font-medium text-[#1d271f]/60">
          একক: {unit}
        </span>
      </div>

      {markets.length === 0 ? (
        <div className="rounded-2xl border border-[#e1e8e1] bg-[#f0f5f0]/60 px-5 py-10 text-center">
          <p className="text-sm sm:text-base font-medium text-[#1d271f]/75">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য বর্তমানে পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-hidden rounded-2xl border border-[#e1e8e1] bg-[#fafcfa]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#e1e8e1] bg-[#fafcfa] text-xs font-semibold text-[#1d271f]/65">
                  <th scope="col" className="py-3.5 px-4">
                    বাজার
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    বিভাগ
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right">
                    সর্বনিম্ন
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right">
                    সর্বোচ্চ
                  </th>
                  <th scope="col" className="py-3.5 px-4 text-right">
                    গড়
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e8e1]/80 text-sm">
                {markets.map((entry, index) => {
                  const minText = formatBengaliPrice(entry.min);
                  const maxText = formatBengaliPrice(entry.max);
                  const avgText = formatBengaliPrice(entry.average);
                  const isAlternate = index % 2 === 1;

                  return (
                    <tr
                      key={`${entry.market}-${entry.division}-${index}`}
                      className={
                        isAlternate
                          ? "bg-[#f0f5f0] hover:bg-[#e7efe7]/80 transition-colors"
                          : "bg-[#fafcfa] hover:bg-[#f0f5f0]/60 transition-colors"
                      }
                    >
                      <td className="py-3 px-4 font-semibold text-[#1d271f]">
                        {entry.market}
                      </td>
                      <td className="py-3 px-4 text-[#1d271f]/75">
                        {entry.division || "—"}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-[#1d271f]">
                        {minText ?? "তথ্য পাওয়া যায়নি"}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-[#1d271f]">
                        {maxText ?? "তথ্য পাওয়া যায়নি"}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#05893e]">
                        {avgText ?? "তথ্য পাওয়া যায়নি"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-3 md:hidden">
            {markets.map((entry, index) => {
              const minText = formatBengaliPrice(entry.min);
              const maxText = formatBengaliPrice(entry.max);
              const avgText = formatBengaliPrice(entry.average);
              const isAlternate = index % 2 === 1;

              return (
                <div
                  key={`${entry.market}-${entry.division}-mobile-${index}`}
                  className={`rounded-xl border border-[#e1e8e1] p-3.5 flex flex-col gap-3 ${
                    isAlternate ? "bg-[#f0f5f0]" : "bg-[#fafcfa]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-[#1d271f] break-words">
                      {entry.market}
                    </span>
                    {entry.division ? (
                      <span className="inline-flex items-center rounded-full bg-[#e2f5e9] px-2.5 py-0.5 text-xs font-semibold text-[#05893e] shrink-0">
                        {entry.division}
                      </span>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#e1e8e1]/80 text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#1d271f]/60">সর্বনিম্ন</span>
                      <span className="font-semibold text-[#1d271f]">
                        {minText ?? "তথ্য নেই"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#1d271f]/60">সর্বোচ্চ</span>
                      <span className="font-semibold text-[#1d271f]">
                        {maxText ?? "তথ্য নেই"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-[#1d271f]/60">গড়</span>
                      <span className="font-bold text-[#05893e]">
                        {avgText ?? "তথ্য নেই"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

