import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";
import { getAllCategories, getAllProducts } from "@/lib/api/bazardor";
import { getConfiguredSocialProviders } from "@/lib/auth";
import { getServerSession } from "@/lib/auth-session";
import { resolveSafeCallbackUrl } from "@/lib/utils/auth-redirect";
import { toTickerItems } from "@/lib/utils/prices";

export const metadata: Metadata = {
  title: "সাইন আপ — বাজার দর",
  description:
    "বাজারদরের সব সুবিধা ব্যবহার করতে একটি অ্যাকাউন্ট তৈরি করুন।",
};

interface SignUpPageProps {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const resolvedParams = await searchParams;
  const safeCallbackUrl = resolveSafeCallbackUrl(resolvedParams.callbackUrl);

  const session = await getServerSession();
  if (session?.user) {
    redirect(safeCallbackUrl);
  }

  const socialProviders = getConfiguredSocialProviders();

  const [categoriesResult, productsResult] = await Promise.allSettled([
    getAllCategories(),
    getAllProducts(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const products =
    productsResult.status === "fulfilled" ? productsResult.value : [];
  const tickerItems = toTickerItems(products);

  return (
    <AuthLayout
      title="নতুন অ্যাকাউন্ট তৈরি করুন"
      subtitle="বাজারদরের সব সুবিধা ব্যবহার করতে একটি অ্যাকাউন্ট তৈরি করুন।"
      categories={categories}
      tickerItems={tickerItems}
    >
      <SignUpForm
        callbackUrl={safeCallbackUrl}
        googleEnabled={socialProviders.google}
        githubEnabled={socialProviders.github}
      />
    </AuthLayout>
  );
}

