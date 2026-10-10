import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import HeroSection from "@/components/home/HeroSection";
import PriceRisersSection from "@/components/home/PriceRisersSection";
import PriceFallersSection from "@/components/home/PriceFallersSection";
import AllProductsSection from "@/components/home/AllProductsSection";
import ErrorState from "@/components/shared/ErrorState";
import Footer from "@/components/layout/Footer";
import { getAllCategories, getAllProducts } from "@/lib/api/bazardor";
import {
  getTopPriceFallers,
  getTopPriceRisers,
  toTickerItems,
} from "@/lib/utils/prices";

export default async function HomePage() {
  const [productsResult, categoriesResult] = await Promise.allSettled([
    getAllProducts(),
    getAllCategories(),
  ]);

  const hasProductsError = productsResult.status === "rejected";
  const products =
    productsResult.status === "fulfilled" ? productsResult.value : [];
  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];

  const tickerItems = toTickerItems(products);
  const topRisers = getTopPriceRisers(products, 6);
  const topFallers = getTopPriceFallers(products, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header categories={categories} />
      <PriceTicker items={tickerItems} />

      <main className="flex-1">
        <HeroSection />

        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12 space-y-12">
          {hasProductsError ? (
            <section id="সব-পণ্য" className="scroll-mt-24">
              <ErrorState />
            </section>
          ) : (
            <>
              <PriceRisersSection products={topRisers} />
              <PriceFallersSection products={topFallers} />
              <AllProductsSection products={products} />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
