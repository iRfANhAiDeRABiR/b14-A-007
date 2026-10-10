import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridSkeletonProps {
  count?: number;
  columns?: 3 | 4;
}

export default function ProductGridSkeleton({
  count = 6,
  columns = 3,
}: ProductGridSkeletonProps) {
  const gridColsClass =
    columns === 4
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

  return (
    <div
      aria-busy="true"
      aria-label="পণ্যের তালিকা লোড হচ্ছে"
      className={gridColsClass}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

