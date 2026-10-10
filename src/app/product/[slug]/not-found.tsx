import Link from "next/link";
import { buttonVariants } from "@heroui/react";
import { ArrowLeft } from "@gravity-ui/icons";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import { getAllCategories, getAllProducts } from "@/lib/api/bazardor";
import { toTickerItems } from "@/lib/utils/prices";

export default async function ProductNotFound() {
  const [categoriesResult, productsResult] = await Promise.allSettled([
    getAllCategories(),
    getAllProducts(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const allProducts =
    productsResult.status === "fulfilled" ? productsResult.value : [];
  const tickerItems = toTickerItems(allProducts);

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header categories={categories} />
      <PriceTicker items={tickerItems} />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-lg w-full rounded-2xl border border-[#e1e8e1] bg-white p-8 sm:p-10 text-center shadow-2xs space-y-4">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#fff6f5] border border-[#d03739]/20 text-[#d03739] text-lg font-bold">
            ৪০৪
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
            পণ্যটি খুঁজে পাওয়া যায়নি।
          </h1>

          <p className="text-sm sm:text-base text-[#1d271f]/70 leading-relaxed">
            আপনি যে পণ্যটি খুঁজছেন সেটি নেই অথবা লিংকটি সঠিক নয়।
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className={`${buttonVariants({
                variant: "primary",
                size: "md",
              })} inline-flex items-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

