import { Card, CardContent, Skeleton } from "@heroui/react";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import HeroSection from "@/components/home/HeroSection";
import SectionHeading from "@/components/shared/SectionHeading";
import Footer from "@/components/layout/Footer";

function ProductGridPlaceholder({ count }: { count: number }) {
  return (
    <div
      aria-label="পণ্যের তালিকা শীঘ্রই যুক্ত হবে"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="border border-[#e1e8e1] bg-white p-4 rounded-xl shadow-2xs"
        >
          <CardContent className="flex flex-col gap-3 p-0">
            <div className="flex items-center justify-between">
              <Skeleton className="w-11 h-11 rounded-lg bg-[#f0f5f0]" />
              <Skeleton className="w-16 h-6 rounded-full bg-[#f0f5f0]" />
            </div>
            <div className="space-y-2 pt-1">
              <Skeleton className="w-3/4 h-5 rounded bg-[#f0f5f0]" />
              <Skeleton className="w-1/2 h-4 rounded bg-[#f0f5f0]" />
            </div>
            <div className="pt-2 border-t border-[#e1e8e1]/70 flex items-center justify-between">
              <Skeleton className="w-20 h-4 rounded bg-[#f0f5f0]" />
              <Skeleton className="w-24 h-6 rounded bg-[#f0f5f0]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafcfa] text-[#1d271f]">
      <Header />
      <PriceTicker />

      <main className="flex-1">
        <HeroSection />

        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12 space-y-12">
          <section aria-labelledby="price-up-heading">
            <SectionHeading
              id="price-up-heading"
              title="আজ দাম বেড়েছে ▲"
              subtitle="আজকের বাজারে যেসব পণ্যের দাম তুলনামূলক বেড়েছে"
            />
            <ProductGridPlaceholder count={6} />
          </section>

          <section aria-labelledby="price-down-heading">
            <SectionHeading
              id="price-down-heading"
              title="আজ দাম কমেছে ▼"
              subtitle="আজকের বাজারে যেসব পণ্যের দাম তুলনামূলক কমেছে"
            />
            <ProductGridPlaceholder count={6} />
          </section>

          <section
            id="সব-পণ্য"
            aria-labelledby="all-products-heading"
            className="scroll-mt-24 pt-2"
          >
            <SectionHeading
              id="all-products-heading"
              title="সব পণ্য"
              subtitle="নিত্যপ্রয়োজনীয় সকল পণ্যের প্রতিদিনের বাজারদর তালিকা"
              action={
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#e1e8e1] bg-white text-xs sm:text-sm font-medium text-[#1d271f]/75">
                  <span>সাজান: ডিফল্ট</span>
                </div>
              }
            />
            <ProductGridPlaceholder count={8} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
