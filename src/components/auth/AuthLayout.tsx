import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@heroui/react";
import type { CategoryItem, TickerProductItem } from "@/types/market";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  categories?: CategoryItem[];
  tickerItems?: TickerProductItem[];
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  categories = [],
  tickerItems = [],
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0]">
      <Header categories={categories} />
      <PriceTicker items={tickerItems} />

      <main className="flex-1 flex flex-col justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[440px] mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#05893e]">
              <span className="w-6 h-6 rounded-lg bg-[#05893e] flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo-icon.png"
                  alt="বাজার দর"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5 object-contain"
                />
              </span>
              <span>বাজার দর</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-[#1d271f] leading-snug">
              {title}
            </h1>
            <p className="text-sm text-[#1d271f]/65 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-xs">
            <CardContent className="p-5 sm:p-6">{children}</CardContent>
          </Card>

          <Link
            href="/"
            className="text-sm font-medium text-[#1d271f]/65 hover:text-[#05893e] text-center transition-colors py-1"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

