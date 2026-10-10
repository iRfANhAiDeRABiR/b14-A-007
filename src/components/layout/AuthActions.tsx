import Link from "next/link";
import { buttonVariants } from "@heroui/react";

interface AuthActionsProps {
  onNavigate?: () => void;
  fullWidth?: boolean;
}

export default function AuthActions({
  onNavigate,
  fullWidth = false,
}: AuthActionsProps) {
  return (
    <div
      className={
        fullWidth
          ? "flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full"
          : "flex items-center gap-2.5"
      }
    >
      <Link
        href="/signin"
        onClick={onNavigate}
        className={`${buttonVariants({
          variant: "outline",
          size: "sm",
          fullWidth,
        })} border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] font-semibold px-4 py-2 rounded-lg text-center transition-colors`}
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        onClick={onNavigate}
        className={`${buttonVariants({
          variant: "primary",
          size: "sm",
          fullWidth,
        })} bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-4 py-2 rounded-lg text-center transition-colors`}
      >
        সাইন আপ
      </Link>
    </div>
  );
}
