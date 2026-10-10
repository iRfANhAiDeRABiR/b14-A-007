import Image from "next/image";
import { Chip, buttonVariants } from "@heroui/react";
import { ArrowDown } from "@gravity-ui/icons";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="w-full border-b border-[#e1e8e1] bg-gradient-to-b from-[#f0f5f0] to-[#fafcfa]"
    >
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 lg:py-16 grid grid-cols-1 md:grid-cols-12 items-center gap-8 lg:gap-12">
        <div className="md:col-span-7 flex flex-col items-start gap-4 text-left">
          <Chip
            color="success"
            variant="soft"
            size="sm"
            className="bg-[#f3fbf4] text-[#05893e] border border-[#05893e]/20 font-semibold px-3 py-1"
          >
            আজকের বাজারদর
          </Chip>

          <h1
            id="hero-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-[#1d271f]"
          >
            নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন এক নজরে
          </h1>

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#1d271f]/75 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছসহ দৈনন্দিন প্রয়োজনীয় পণ্যের বাজারদর
            সহজেই দেখুন এক জায়গায়।
          </p>

          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className={`${buttonVariants({
                variant: "primary",
                size: "lg",
              })} inline-flex items-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-6 py-3 rounded-lg shadow-xs transition-colors`}
            >
              <span>সব পণ্যের দাম দেখুন</span>
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="md:col-span-5 flex items-center justify-center md:justify-end">
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[340px] flex items-center justify-center rounded-2xl bg-white/80 border border-[#e1e8e1] p-6 shadow-xs">
            <Image
              src="/images/bazar-hero.png"
              alt="ঝুড়িভর্তি তাজা সবজি ও নিত্যপ্রয়োজনীয় বাজারের পণ্য"
              width={260}
              height={220}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

