import { Card, CardContent, Skeleton } from "@heroui/react";

export default function ProductDetailSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="পণ্যের বিস্তারিত তথ্য লোড হচ্ছে"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="h-4 w-10 rounded bg-[#e1e8e1]" />
        <Skeleton className="h-4 w-16 rounded bg-[#e1e8e1]" />
        <Skeleton className="h-4 w-12 rounded bg-[#e1e8e1]" />
        <Skeleton className="h-4 w-28 rounded bg-[#e1e8e1]" />
      </div>

      <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4 flex-1">
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f0f5f0] shrink-0" />
              <div className="space-y-2.5 flex-1">
                <Skeleton className="h-7 sm:h-8 w-44 sm:w-60 rounded bg-[#f0f5f0]" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-5 w-14 rounded-full bg-[#f0f5f0]" />
                </div>
                <Skeleton className="h-4 w-56 sm:w-72 max-w-full rounded bg-[#f0f5f0]" />
              </div>
            </div>

            <div className="rounded-2xl bg-[#f0f5f0] border border-[#e1e8e1]/80 px-5 py-4 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 md:min-w-[165px]">
              <div className="space-y-2 flex flex-col md:items-center">
                <Skeleton className="h-3.5 w-16 rounded bg-[#e1e8e1]" />
                <Skeleton className="h-8 w-24 rounded bg-[#e1e8e1]" />
                <Skeleton className="h-3.5 w-20 rounded bg-[#e1e8e1]" />
              </div>
              <Skeleton className="h-6 w-14 rounded-full bg-[#e1e8e1]" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
        <CardContent className="p-5 sm:p-6 space-y-7">
          <div className="space-y-3.5">
            <Skeleton className="h-6 w-36 rounded bg-[#f0f5f0]" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`summary-skeleton-${idx}`}
                  className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24 rounded bg-[#f0f5f0]" />
                    <Skeleton className="w-7 h-7 rounded-lg bg-[#f0f5f0]" />
                  </div>
                  <Skeleton className="h-7 w-28 rounded bg-[#f0f5f0]" />
                  <Skeleton className="h-3.5 w-40 rounded bg-[#f0f5f0]" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48 rounded bg-[#f0f5f0]" />
              <Skeleton className="h-4 w-20 rounded bg-[#f0f5f0]" />
            </div>

            <div className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] overflow-hidden divide-y divide-[#e1e8e1]/80">
              <div className="bg-[#fafcfa] px-4 py-3.5 flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-24 rounded bg-[#f0f5f0]" />
                <Skeleton className="h-4 w-16 rounded bg-[#f0f5f0]" />
                <Skeleton className="h-4 w-16 rounded bg-[#f0f5f0]" />
                <Skeleton className="h-4 w-16 rounded bg-[#f0f5f0]" />
                <Skeleton className="h-4 w-16 rounded bg-[#f0f5f0]" />
              </div>

              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={`market-row-skeleton-${idx}`}
                  className={`px-4 py-3.5 flex items-center justify-between gap-4 ${
                    idx % 2 === 1 ? "bg-[#f0f5f0]" : "bg-[#fafcfa]"
                  }`}
                >
                  <Skeleton className="h-4 w-32 rounded bg-[#e1e8e1]" />
                  <Skeleton className="h-4 w-20 rounded bg-[#e1e8e1]" />
                  <Skeleton className="h-4 w-16 rounded bg-[#e1e8e1]" />
                  <Skeleton className="h-4 w-16 rounded bg-[#e1e8e1]" />
                  <Skeleton className="h-4 w-16 rounded bg-[#e1e8e1]" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

