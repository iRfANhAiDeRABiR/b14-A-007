import { Card, CardContent, Skeleton } from "@heroui/react";

export default function ProductCardSkeleton() {
  return (
    <Card className="h-full border border-[#e1e8e1] bg-white rounded-xl p-4">
      <CardContent className="flex flex-col justify-between gap-4 p-0 h-full">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-xl bg-[#f0f5f0] shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="w-3/4 h-5 rounded bg-[#f0f5f0]" />
            <Skeleton className="w-1/2 h-3.5 rounded bg-[#f0f5f0]" />
          </div>
        </div>

        <div className="pt-3 border-t border-[#e1e8e1]/70 flex items-end justify-between gap-2">
          <div className="space-y-1.5">
            <Skeleton className="w-16 h-3 rounded bg-[#f0f5f0]" />
            <Skeleton className="w-24 h-6 rounded bg-[#f0f5f0]" />
          </div>
          <Skeleton className="w-16 h-6 rounded-full bg-[#f0f5f0]" />
        </div>
      </CardContent>
    </Card>
  );
}

