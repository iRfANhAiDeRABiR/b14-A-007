import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import ProfileCard from "@/components/profile/ProfileCard";
import ErrorState from "@/components/shared/ErrorState";
import { getAllCategories, getAllProducts } from "@/lib/api/bazardor";
import { getServerSessionResult } from "@/lib/auth-session";
import { buildProtectedSignInRedirectUrl } from "@/lib/utils/auth-redirect";
import { toTickerItems } from "@/lib/utils/prices";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "আমার প্রোফাইল — বাজার দর",
  description: "আপনার অ্যাকাউন্টের তথ্য এখানে দেখতে ও পরিবর্তন করতে পারবেন।",
};

export default async function ProfilePage() {
  const sessionResult = await getServerSessionResult();

  if (sessionResult.status === "unauthenticated") {
    redirect(buildProtectedSignInRedirectUrl("/profile"));
  }

  const [categoriesResult, productsResult] = await Promise.allSettled([
    getAllCategories(),
    getAllProducts(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const allProducts =
    productsResult.status === "fulfilled" ? productsResult.value : [];
  const tickerItems = toTickerItems(allProducts);

  if (sessionResult.status === "error") {
    return (
      <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
        <Header categories={categories} />
        <PriceTicker items={tickerItems} />

        <main className="flex-1">
          <div className="max-w-3xl mx-auto px-4 py-10 sm:py-12">
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header categories={categories} />
      <PriceTicker items={tickerItems} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <ProfileCard user={sessionResult.session.user} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

