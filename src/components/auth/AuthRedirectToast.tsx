"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface AuthRedirectToastProps {
  reason?: string;
}

export default function AuthRedirectToast({ reason }: AuthRedirectToastProps) {
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (reason !== "auth_required" || hasShownRef.current) {
      return;
    }

    hasShownRef.current = true;
    toast.error("পণ্যের বিস্তারিত তথ্য দেখতে প্রথমে সাইন ইন করুন।", {
      id: "auth-required-toast",
    });

    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.has("reason")) {
        currentUrl.searchParams.delete("reason");
        const nextSearch = currentUrl.searchParams.toString();
        const nextRelativeUrl = nextSearch
          ? `${currentUrl.pathname}?${nextSearch}`
          : currentUrl.pathname;
        window.history.replaceState(null, "", nextRelativeUrl);
      }
    }
  }, [reason]);

  return null;
}

