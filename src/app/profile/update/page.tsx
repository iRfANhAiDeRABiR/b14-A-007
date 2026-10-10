import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Header from "@/components/layout/Header";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";
import ErrorState from "@/components/shared/ErrorState";
import { getAllCategories, getAllProducts } from "@/lib/api/bazardor";
import { getServerSessionResult } from "@/lib/auth-session";
import { buildProtectedSignInRedirectUrl } from "@/lib/utils/auth-redirect";
import { toTickerItems } from "@/lib/utils/prices";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "প্রোফাইল তথ্য আপডেট করুন — বাজার দর",
  description: "আপনার নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।",
};

export default async function UpdateProfilePage() {
  const sessionResult = await getServerSessionResult();

  if (sessionResult.status === "unauthenticated") {
    redirect(buildProtectedSignInRedirectUrl("/profile/update"));
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
          <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12">
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

  const user = sessionResult.session.user;

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header categories={categories} />
      <PriceTicker items={tickerItems} />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
          <UpdateProfileForm
            initialName={user.name ?? ""}
            email={user.email}
            image={user.image}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

