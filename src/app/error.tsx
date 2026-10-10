"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@heroui/react";
import {
  ArrowLeft,
  ArrowRotateRight,
  TriangleExclamation,
} from "@gravity-ui/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface GlobalErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalErrorPage({ reset }: GlobalErrorPageProps) {
  const router = useRouter();
  const [isRetrying, startTransition] = useTransition();

  function handleRetry() {
    if (isRetrying) {
      return;
    }

    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f5f0] text-[#1d271f]">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div
          role="alert"
          className="max-w-lg w-full rounded-2xl border border-[#d03739]/30 bg-[#fafcfa] p-8 sm:p-10 text-center shadow-2xs space-y-4"
        >
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#fff6f5] border border-[#d03739]/25 flex items-center justify-center text-[#d03739]">
            <TriangleExclamation className="w-7 h-7" aria-hidden="true" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
            কিছু একটি সমস্যা হয়েছে
          </h1>

          <p className="text-sm sm:text-base text-[#1d271f]/75 leading-relaxed">
            এই মুহূর্তে পেজটি লোড করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button
              type="button"
              variant="primary"
              size="md"
              isDisabled={isRetrying}
              onPress={handleRetry}
              className="inline-flex items-center justify-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              <ArrowRotateRight
                className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              <span>
                {isRetrying ? "আবার চেষ্টা করা হচ্ছে..." : "আবার চেষ্টা করুন"}
              </span>
            </Button>

            <Link
              href="/"
              className={`${buttonVariants({
                variant: "outline",
                size: "md",
              })} inline-flex items-center justify-center gap-2 border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] font-semibold px-6 py-2.5 rounded-xl transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
