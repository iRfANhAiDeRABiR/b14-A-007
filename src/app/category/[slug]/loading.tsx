import { Skeleton } from "@heroui/react";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";
import Footer from "@/components/layout/Footer";

export default function CategoryLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header isLoadingCategories />
      <PriceTicker isLoading />

      <main className="flex-1">
        <div
          aria-busy="true"
          aria-label="ক্যাটাগরি পেজ লোড হচ্ছে"
          className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-6"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12 rounded bg-[#e1e8e1]" />
            <Skeleton className="h-4 w-16 rounded bg-[#e1e8e1]" />
            <Skeleton className="h-4 w-20 rounded bg-[#e1e8e1]" />
          </div>

          <div className="rounded-2xl border border-[#e1e8e1] bg-white p-6 sm:p-8 shadow-2xs flex items-center gap-4">
            <Skeleton className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f0f5f0] shrink-0" />
            <div className="space-y-2.5 flex-1">
              <Skeleton className="h-7 w-36 sm:w-48 rounded bg-[#f0f5f0]" />
              <Skeleton className="h-4 w-64 sm:w-80 max-w-full rounded bg-[#f0f5f0]" />
            </div>
          </div>

          <div className="rounded-xl border border-[#e1e8e1] bg-white px-4 py-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Skeleton className="h-5 w-28 rounded bg-[#f0f5f0]" />
            <Skeleton className="h-9 w-48 rounded-lg bg-[#f0f5f0]" />
          </div>

          <ProductGridSkeleton count={6} columns={3} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
