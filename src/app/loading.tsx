import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import HeroSection from "@/components/home/HeroSection";
import SectionHeading from "@/components/shared/SectionHeading";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";
import Footer from "@/components/layout/Footer";

export default function HomeLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header isLoadingCategories />
      <PriceTicker isLoading />

      <main className="flex-1">
        <HeroSection />

        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12 space-y-12">
          <section aria-labelledby="loading-risers-heading">
            <SectionHeading
              id="loading-risers-heading"
              title="আজ দাম বেড়েছে ▲"
              subtitle="আজকের বাজারে যেসব পণ্যের দাম তুলনামূলক বেড়েছে"
            />
            <ProductGridSkeleton count={6} columns={3} />
          </section>

          <section aria-labelledby="loading-fallers-heading">
            <SectionHeading
              id="loading-fallers-heading"
              title="আজ দাম কমেছে ▼"
              subtitle="আজকের বাজারে যেসব পণ্যের দাম তুলনামূলক কমেছে"
            />
            <ProductGridSkeleton count={6} columns={3} />
          </section>

          <section
            id="সব-পণ্য"
            aria-labelledby="loading-all-products-heading"
            className="scroll-mt-24 pt-2"
          >
            <SectionHeading
              id="loading-all-products-heading"
              title="সব পণ্য"
              subtitle="নিত্যপ্রয়োজনীয় সব পণ্যের সর্বশেষ বাজারদর এক জায়গায় দেখুন।"
            />
            <ProductGridSkeleton count={9} columns={3} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

