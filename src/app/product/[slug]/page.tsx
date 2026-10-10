import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@heroui/react";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import ProductDetailHeader from "@/components/products/ProductDetailHeader";
import PriceSummaryCards from "@/components/products/PriceSummaryCards";
import MarketPriceList from "@/components/products/MarketPriceList";
import ErrorState from "@/components/shared/ErrorState";
import {
  getAllCategories,
  getAllProducts,
  getProductDetailById,
} from "@/lib/api/bazardor";
import { getServerSessionResult } from "@/lib/auth-session";
import { buildProtectedSignInRedirectUrl } from "@/lib/utils/auth-redirect";
import { toTickerItems } from "@/lib/utils/prices";

export const dynamic = "force-dynamic";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

function normalizeProductIdentifier(rawSlug: string): string | null {
  try {
    const decoded = decodeURIComponent(rawSlug).trim();
    if (!decoded || !/^[a-zA-Z0-9_-]+$/.test(decoded)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const sessionResult = await getServerSessionResult();
  if (sessionResult.status !== "authenticated") {
    return {
      title: "পণ্যের বিস্তারিত | বাজার দর",
    };
  }

  const { slug: rawSlug } = await params;
  const identifier = normalizeProductIdentifier(rawSlug);

  if (!identifier) {
    return {
      title: "পণ্যটি খুঁজে পাওয়া যায়নি — বাজার দর",
    };
  }

  try {
    const product = await getProductDetailById(identifier);
    if (!product) {
      return {
        title: "পণ্যটি খুঁজে পাওয়া যায়নি — বাজার দর",
      };
    }

    return {
      title: `${product.name} — বাজার দর`,
      description: `${product.name}-এর আজকের বাজারদর, সর্বনিম্ন, সর্বোচ্চ, গড় এবং বাজারভিত্তিক দাম দেখুন।`,
    };
  } catch {
    return {
      title: "পণ্যের বিস্তারিত — বাজার দর",
    };
  }
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug: rawSlug } = await params;
  const identifier = normalizeProductIdentifier(rawSlug);
  const safeTargetPath = identifier
    ? `/product/${encodeURIComponent(identifier)}`
    : "/product";

  const sessionResult = await getServerSessionResult();

  if (sessionResult.status === "unauthenticated") {
    redirect(buildProtectedSignInRedirectUrl(safeTargetPath));
  }

  if (sessionResult.status === "error") {
    const [categoriesResult, productsResult] = await Promise.allSettled([
      getAllCategories(),
      getAllProducts(),
    ]);
    const categories =
      categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
    const allProducts =
      productsResult.status === "fulfilled" ? productsResult.value : [];
    const tickerItems = toTickerItems(allProducts);

    return (
      <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
        <Header categories={categories} />
        <PriceTicker items={tickerItems} />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
            <ErrorState
              title="অথেনটিকেশন যাচাই করা সম্ভব হয়নি"
              description="সার্ভারের সাথে সাময়িক সংযোগ সমস্যার কারণে আপনার সেশন যাচাই করা যায়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
            />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!identifier) {
    notFound();
  }

  const [productResult, categoriesResult, allProductsResult] =
    await Promise.allSettled([
      getProductDetailById(identifier),
      getAllCategories(),
      getAllProducts(),
    ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const allProducts =
    allProductsResult.status === "fulfilled" ? allProductsResult.value : [];
  const tickerItems = toTickerItems(allProducts);

  if (productResult.status === "rejected") {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
        <Header categories={categories} />
        <PriceTicker items={tickerItems} />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
            <ErrorState title="এই মুহূর্তে পণ্যের তথ্য লোড করা যাচ্ছে না।" />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const product = productResult.value;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header categories={categories} />
      <PriceTicker items={tickerItems} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-6">
          <ProductDetailHeader product={product} />

          <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
            <CardContent className="p-5 sm:p-6 space-y-8">
              <PriceSummaryCards
                priceSummary={product.priceSummary}
                unit={product.unit}
              />

              <MarketPriceList
                markets={product.markets}
                unit={product.unit}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
