import Image from "next/image";
import { buttonVariants } from "@heroui/react";
import { getFormattedBanglaDate } from "@/components/layout/BrandLogo";

export default function HeroSection() {
  const banglaDate = getFormattedBanglaDate();

  return (
    <section aria-labelledby="hero-heading" className="w-full pt-6 sm:pt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-2xl border border-[#e1e8e1] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-11 shadow-2xs grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          <div className="md:col-span-7 lg:col-span-8 flex flex-col items-start gap-4 text-left">
            <span
              suppressHydrationWarning
              className="inline-flex items-center rounded-full bg-[#e2f5e9] text-[#05893e] text-xs sm:text-sm font-semibold px-3.5 py-1"
            >
              {banglaDate}
            </span>

            <h1
              id="hero-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-[#1d271f]"
            >
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[#1d271f]/70 max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className={`${buttonVariants({
                  variant: "primary",
                  size: "md",
                })} inline-flex items-center justify-center bg-[#05893e] hover:bg-[#047f39] text-white font-semibold px-6 py-2.5 rounded-lg shadow-sm transition-colors`}
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex items-center justify-center md:justify-end">
            <Image
              src="/images/bazar-hero.png"
              alt="ঝুড়িভর্তি তাজা সবজি ও নিত্যপ্রয়োজনীয় বাজারের পণ্য"
              width={260}
              height={220}
              priority
              className="w-48 sm:w-56 lg:w-64 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
