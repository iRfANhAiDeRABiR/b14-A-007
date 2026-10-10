"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface AuthRedirectToastProps {
  reason?: string;
  callbackUrl?: string;
}

export default function AuthRedirectToast({
  reason,
  callbackUrl,
}: AuthRedirectToastProps) {
  const hasShownRef = useRef(false);

  useEffect(() => {
    if (reason !== "auth_required" || hasShownRef.current) {
      return;
    }

    hasShownRef.current = true;
    const isProfileRoute = Boolean(
      callbackUrl &&
        (callbackUrl === "/profile" || callbackUrl.startsWith("/profile/"))
    );
    const message = isProfileRoute
      ? "প্রোফাইল দেখতে বা তথ্য পরিবর্তন করতে প্রথমে সাইন ইন করুন।"
      : "পণ্যের বিস্তারিত তথ্য দেখতে প্রথমে সাইন ইন করুন।";

    toast.error(message, {
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
  }, [reason, callbackUrl]);

  return null;
}


