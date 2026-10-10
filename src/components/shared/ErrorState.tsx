"use client";

import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { ArrowRotateRight } from "@gravity-ui/icons";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export default function ErrorState({
  title = "এই মুহূর্তে বাজারদরের তথ্য লোড করা যাচ্ছে না।",
  description = "অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।",
}: ErrorStateProps) {
  const router = useRouter();

  return (
    <div
      role="alert"
      className="w-full rounded-xl border border-[#d03739]/30 bg-[#fff6f5] p-6 sm:p-8 text-center flex flex-col items-center gap-3"
    >
      <p className="text-base sm:text-lg font-bold text-[#d03739]">{title}</p>
      <p className="text-sm sm:text-base text-[#1d271f]/75 max-w-md">
        {description}
      </p>
      <div className="pt-2">
        <Button
          variant="primary"
          size="md"
          onPress={() => router.refresh()}
          className="inline-flex items-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-5 py-2 rounded-lg"
        >
          <ArrowRotateRight className="w-4 h-4" aria-hidden="true" />
          <span>আবার চেষ্টা করুন</span>
        </Button>
      </div>
    </div>
  );
}

