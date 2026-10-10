"use client";

import { useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonVariants } from "@heroui/react";
import { ArrowLeft, ArrowRotateRight } from "@gravity-ui/icons";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export default function ErrorState({
  title = "বাজারদরের তথ্য লোড করা যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।",
  description = "সার্ভারের সাথে সংযোগ স্থাপন করতে সমস্যা হচ্ছে। কিছুক্ষণ পর পুনরায় চেষ্টা করুন।",
}: ErrorStateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isRetrying, startTransition] = useTransition();

  function handleRetry() {
    if (isRetrying) {
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      role="alert"
      className="w-full rounded-xl border border-[#d03739]/30 bg-[#fff6f5] p-6 sm:p-8 text-center flex flex-col items-center gap-3"
    >
      <p className="text-base sm:text-lg font-bold text-[#d03739]">{title}</p>
      <p className="text-sm sm:text-base text-[#1d271f]/75 max-w-md">
        {description}
      </p>
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          isDisabled={isRetrying}
          onPress={handleRetry}
          className="inline-flex items-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-5 py-2 rounded-lg disabled:opacity-60"
        >
          <ArrowRotateRight
            className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          <span>
            {isRetrying ? "আবার চেষ্টা করা হচ্ছে..." : "আবার চেষ্টা করুন"}
          </span>
        </Button>

        {pathname !== "/" ? (
          <Link
            href="/"
            className={`${buttonVariants({
              variant: "outline",
              size: "md",
            })} inline-flex items-center gap-2 border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] font-semibold px-5 py-2 rounded-lg transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
