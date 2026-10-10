"use client";

import { useRef, useState } from "react";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getSocialAuthErrorMessage } from "@/lib/utils/auth-errors";
import { resolveSafeCallbackUrl } from "@/lib/utils/auth-redirect";

interface SocialAuthButtonsProps {
  callbackUrl?: string;
  googleEnabled: boolean;
  githubEnabled: boolean;
  disabled?: boolean;
  onBusyChange?: (isBusy: boolean) => void;
}

function GoogleIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 fill-[#1d271f]"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.02 11.02 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export default function SocialAuthButtons({
  callbackUrl,
  googleEnabled,
  githubEnabled,
  disabled = false,
  onBusyChange,
}: SocialAuthButtonsProps) {
  const [activeProvider, setActiveProvider] = useState<
    "google" | "github" | null
  >(null);
  const isBusyRef = useRef(false);
  const safeCallbackUrl = resolveSafeCallbackUrl(callbackUrl);

  async function handleSocialSignIn(provider: "google" | "github") {
    const isEnabled = provider === "google" ? googleEnabled : githubEnabled;
    if (!isEnabled || disabled || isBusyRef.current) {
      return;
    }

    isBusyRef.current = true;
    setActiveProvider(provider);
    onBusyChange?.(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: safeCallbackUrl,
      });

      if (error) {
        toast.error(getSocialAuthErrorMessage(provider));
        isBusyRef.current = false;
        setActiveProvider(null);
        onBusyChange?.(false);
      }
    } catch {
      toast.error(getSocialAuthErrorMessage(provider));
      isBusyRef.current = false;
      setActiveProvider(null);
      onBusyChange?.(false);
    }
  }

  const isAnyBusy = disabled || activeProvider !== null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center gap-3 py-0.5">
        <div className="h-[1px] flex-1 bg-[#1d271f]/10" />
        <span className="text-xs font-medium text-[#1d271f]/60 shrink-0">
          অথবা
        </span>
        <div className="h-[1px] flex-1 bg-[#1d271f]/10" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <Button
          type="button"
          variant="outline"
          size="md"
          isDisabled={!googleEnabled || isAnyBusy}
          onPress={() => handleSocialSignIn("google")}
          aria-label={
            googleEnabled
              ? "Google দিয়ে চালিয়ে যান"
              : "Google দিয়ে চালিয়ে যান (কনফিগার করা নেই)"
          }
          className="h-10 w-full rounded-lg border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] text-xs sm:text-[13px] font-medium px-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
        >
          {activeProvider === "google" ? (
            <span
              className="h-4 w-4 rounded-full border-2 border-[#05893e] border-t-transparent animate-spin shrink-0"
              aria-hidden="true"
            />
          ) : (
            <GoogleIcon />
          )}
          <span className="truncate">Google দিয়ে চালিয়ে যান</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="md"
          isDisabled={!githubEnabled || isAnyBusy}
          onPress={() => handleSocialSignIn("github")}
          aria-label={
            githubEnabled
              ? "GitHub দিয়ে চালিয়ে যান"
              : "GitHub দিয়ে চালিয়ে যান (কনফিগার করা নেই)"
          }
          className="h-10 w-full rounded-lg border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] text-xs sm:text-[13px] font-medium px-3 flex items-center justify-center gap-2 transition-colors disabled:opacity-55 disabled:cursor-not-allowed"
        >
          {activeProvider === "github" ? (
            <span
              className="h-4 w-4 rounded-full border-2 border-[#05893e] border-t-transparent animate-spin shrink-0"
              aria-hidden="true"
            />
          ) : (
            <GitHubIcon />
          )}
          <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
        </Button>
      </div>

      {!googleEnabled || !githubEnabled ? (
        <p className="text-[11px] text-[#1d271f]/55 text-center">
          {!googleEnabled && !githubEnabled
            ? "সোশ্যাল লগইন বর্তমানে কনফিগার করা নেই।"
            : !googleEnabled
              ? "Google লগইন বর্তমানে কনফিগার করা নেই।"
              : "GitHub লগইন বর্তমানে কনফিগার করা নেই।"}
        </p>
      ) : null}
    </div>
  );
}

