import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import CategoryHeader from "@/components/categories/CategoryHeader";
import CategoryProductExplorer from "@/components/categories/CategoryProductExplorer";
import ErrorState from "@/components/shared/ErrorState";
import {
  getAllCategories,
  getAllProducts,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/api/bazardor";
import { toTickerItems } from "@/lib/utils/prices";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

function normalizeSlugParam(rawSlug: string): string | null {
  try {
    const decoded = decodeURIComponent(rawSlug).trim().toLowerCase();
    if (!decoded || !/^[a-z0-9-]+$/.test(decoded)) {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlugParam(rawSlug);

  if (!slug) {
    return {
      title: "ক্যাটাগরি খুঁজে পাওয়া যায়নি — বাজার দর",
    };
  }

  try {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return {
        title: "ক্যাটাগরি খুঁজে পাওয়া যায়নি — বাজার দর",
      };
    }

    return {
      title: `${category.name} — বাজার দর`,
      description: `${category.name} ক্যাটাগরির সব পণ্যের বর্তমান বাজারদর দেখুন।`,
    };
  } catch {
    return {
      title: "ক্যাটাগরি — বাজার দর",
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlugParam(rawSlug);

  if (!slug) {
    notFound();
  }

  const [categoryResult, allCategoriesResult, allProductsResult] =
    await Promise.allSettled([
      getCategoryBySlug(slug),
      getAllCategories(),
      getAllProducts(),
    ]);

  const categories =
    allCategoriesResult.status === "fulfilled"
      ? allCategoriesResult.value
      : [];
  const allProducts =
    allProductsResult.status === "fulfilled" ? allProductsResult.value : [];
  const tickerItems = toTickerItems(allProducts);

  const fallbackMatchedCategory =
    categories.find((item) => item.slug === slug) ?? null;

  if (categoryResult.status === "fulfilled" && categoryResult.value === null) {
    if (!fallbackMatchedCategory) {
      notFound();
    }
  }

  const resolvedCategory =
    categoryResult.status === "fulfilled" && categoryResult.value
      ? categoryResult.value
      : fallbackMatchedCategory;

  if (!resolvedCategory) {
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

  let categoryProductsError = false;
  let categoryProducts: Awaited<ReturnType<typeof getProductsByCategory>> = [];

  try {
    categoryProducts = await getProductsByCategory(resolvedCategory.slug);
  } catch {
    categoryProductsError = true;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header
        categories={categories}
        activeCategorySlug={resolvedCategory.slug}
      />
      <PriceTicker items={tickerItems} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-6">
          <CategoryHeader category={resolvedCategory} />

          {categoryProductsError ? (
            <ErrorState title="এই মুহূর্তে পণ্যের তথ্য লোড করা যাচ্ছে না।" />
          ) : (
            <CategoryProductExplorer products={categoryProducts} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
