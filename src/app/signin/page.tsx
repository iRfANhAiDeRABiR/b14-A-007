import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthRedirectToast from "@/components/auth/AuthRedirectToast";
import SignInForm from "@/components/auth/SignInForm";
import { getAllCategories, getAllProducts } from "@/lib/api/bazardor";
import { getConfiguredSocialProviders } from "@/lib/auth";
import { getServerSession } from "@/lib/auth-session";
import { resolveSafeCallbackUrl } from "@/lib/utils/auth-redirect";
import { toTickerItems } from "@/lib/utils/prices";

export const metadata: Metadata = {
  title: "সাইন ইন — বাজার দর",
  description: "বাজারদরের বিস্তারিত তথ্য দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।",
};

interface SignInPageProps {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    error?: string | string[];
    reason?: string | string[];
  }>;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedParams = await searchParams;
  const safeCallbackUrl = resolveSafeCallbackUrl(resolvedParams.callbackUrl);
  const oauthError =
    typeof resolvedParams.error === "string"
      ? resolvedParams.error
      : undefined;
  const redirectReason =
    typeof resolvedParams.reason === "string"
      ? resolvedParams.reason
      : undefined;

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
      title="আপনার অ্যাকাউন্টে সাইন ইন করুন"
      subtitle="বাজারদরের বিস্তারিত তথ্য দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।"
      categories={categories}
      tickerItems={tickerItems}
    >
      <AuthRedirectToast
        reason={redirectReason}
        callbackUrl={safeCallbackUrl}
      />
      <SignInForm
        callbackUrl={safeCallbackUrl}
        oauthError={oauthError}
        googleEnabled={socialProviders.google}
        githubEnabled={socialProviders.github}
      />
    </AuthLayout>
  );
}

