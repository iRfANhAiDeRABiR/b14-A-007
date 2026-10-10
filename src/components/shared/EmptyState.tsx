import Link from "next/link";
import { buttonVariants } from "@heroui/react";
import { ArrowLeft } from "@gravity-ui/icons";

interface EmptyStateProps {
  message: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}

export default function EmptyState({
  message,
  description,
  actionHref,
  actionLabel = "হোম পেজে ফিরে যান",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="w-full rounded-xl border border-[#e1e8e1] bg-white p-8 sm:p-10 text-center flex flex-col items-center gap-3"
    >
      <p className="text-base sm:text-lg font-semibold text-[#1d271f]">
        {message}
      </p>
      {description ? (
        <p className="text-sm text-[#1d271f]/65 max-w-md">{description}</p>
      ) : null}
      {actionHref ? (
        <div className="pt-2">
          <Link
            href={actionHref}
            className={`${buttonVariants({
              variant: "primary",
              size: "md",
            })} inline-flex items-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{actionLabel}</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
