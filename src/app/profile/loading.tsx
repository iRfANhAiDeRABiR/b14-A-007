import { Card, CardContent, Skeleton } from "@heroui/react";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header isLoadingCategories />
      <PriceTicker isLoading />

      <main className="flex-1">
        <div
          aria-busy="true"
          aria-label="প্রোফাইল পেজ লোড হচ্ছে"
          className="max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-10 rounded bg-[#e1e8e1]" />
            <Skeleton className="h-4 w-24 rounded bg-[#e1e8e1]" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-8 w-44 rounded bg-[#e1e8e1]" />
            <Skeleton className="h-4 w-80 max-w-full rounded bg-[#e1e8e1]" />
          </div>

          <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
            <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Skeleton className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#f0f5f0] shrink-0" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-4 w-52 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-5 w-36 rounded-full bg-[#f0f5f0]" />
                </div>
              </div>
              <Skeleton className="h-10 w-36 rounded-lg bg-[#f0f5f0]" />
            </CardContent>
          </Card>

          <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
            <CardContent className="p-5 sm:p-6 space-y-5">
              <Skeleton className="h-6 w-20 rounded bg-[#f0f5f0]" />
              <div className="rounded-xl border border-[#e1e8e1] bg-white divide-y divide-[#e1e8e1]/80">
                <div className="p-4 flex items-center justify-between gap-4">
                  <Skeleton className="h-4 w-20 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-5 w-36 rounded bg-[#f0f5f0]" />
                </div>
                <div className="p-4 flex items-center justify-between gap-4">
                  <Skeleton className="h-4 w-24 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-5 w-48 rounded bg-[#f0f5f0]" />
                </div>
                <div className="p-4 flex items-center justify-between gap-4">
                  <Skeleton className="h-4 w-36 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-5 w-32 rounded bg-[#f0f5f0]" />
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

