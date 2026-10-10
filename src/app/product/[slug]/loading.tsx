import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import ProductDetailSkeleton from "@/components/products/ProductDetailSkeleton";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header isLoadingCategories />
      <PriceTicker isLoading />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
          <ProductDetailSkeleton />
        </div>
      </main>

      <Footer />
    </div>
  );
}

