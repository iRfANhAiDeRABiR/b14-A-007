import { Card, CardContent, Skeleton } from "@heroui/react";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";

export default function UpdateProfileLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header isLoadingCategories />
      <PriceTicker isLoading />

      <main className="flex-1">
        <div
          aria-busy="true"
          aria-label="প্রোফাইল আপডেট পেজ লোড হচ্ছে"
          className="max-w-2xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-10 rounded bg-[#e1e8e1]" />
            <Skeleton className="h-4 w-24 rounded bg-[#e1e8e1]" />
            <Skeleton className="h-4 w-36 rounded bg-[#e1e8e1]" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded bg-[#e1e8e1]" />
            <Skeleton className="h-4 w-80 max-w-full rounded bg-[#e1e8e1]" />
          </div>

          <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
            <CardContent className="p-5 sm:p-7 space-y-6">
              <div className="flex items-center gap-4 pb-5 border-b border-[#e1e8e1]">
                <Skeleton className="w-14 h-14 rounded-2xl bg-[#f0f5f0] shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-4 w-48 rounded bg-[#f0f5f0]" />
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-24 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-11 w-full rounded-xl bg-[#f0f5f0]" />
                </div>

                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-44 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-11 w-full rounded-xl bg-[#f0f5f0]" />
                </div>

                <div className="pt-2 flex flex-col-reverse sm:flex-row justify-end gap-3">
                  <Skeleton className="h-11 w-28 rounded-xl bg-[#f0f5f0]" />
                  <Skeleton className="h-11 w-56 rounded-xl bg-[#f0f5f0]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

