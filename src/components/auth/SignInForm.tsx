"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  getSignInErrorMessage,
  normalizeEmailInput,
  validateSignInInput,
  type SignInFormErrors,
} from "@/lib/utils/auth-errors";
import {
  buildAuthPageHref,
  resolveSafeCallbackUrl,
} from "@/lib/utils/auth-redirect";
import PasswordField from "./PasswordField";
import SocialAuthButtons from "./SocialAuthButtons";

interface SignInFormProps {
  callbackUrl?: string;
  oauthError?: string;
  googleEnabled: boolean;
  githubEnabled: boolean;
}

export default function SignInForm({
  callbackUrl,
  oauthError,
  googleEnabled,
  githubEnabled,
}: SignInFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SignInFormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialBusy, setIsSocialBusy] = useState(false);
  const isSubmittingRef = useRef(false);
  const hasShownOAuthErrorRef = useRef(false);

  const safeCallbackUrl = resolveSafeCallbackUrl(callbackUrl);
  const signUpHref = buildAuthPageHref("/signup", safeCallbackUrl);
  const isBusy = isSubmitting || isSocialBusy;

  useEffect(() => {
    if (oauthError && !hasShownOAuthErrorRef.current) {
      hasShownOAuthErrorRef.current = true;
      const message = "কিছু একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
    }
  }, [oauthError]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current || isSocialBusy) {
      return;
    }

    setFormError(null);
    const validation = validateSignInInput({ email, password });

    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      if (validation.firstErrorMessage) {
        toast.error(validation.firstErrorMessage);
      }
      return;
    }

    setFieldErrors({});
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: normalizeEmailInput(email),
        password,
      });

      if (error || !data) {
        const message = getSignInErrorMessage(error);
        setFormError(message);
        toast.error(message);
        isSubmittingRef.current = false;
        setIsSubmitting(false);
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push(safeCallbackUrl);
      router.refresh();
    } catch {
      const message = "সাইন ইন করা যাচ্ছে না। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {formError ? (
          <div
            role="alert"
            className="rounded-lg border border-[#d03739]/30 bg-[#d03739]/10 px-3.5 py-2.5 text-xs font-medium text-[#d03739]"
          >
            {formError}
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="signin-email"
            isInvalid={Boolean(fieldErrors.email)}
            isDisabled={isBusy}
            className="text-sm font-medium text-[#1d271f]"
          >
            ইমেইল ঠিকানা
          </Label>
          <Input
            id="signin-email"
            name="email"
            type="email"
            placeholder="আপনার ইমেইল লিখুন"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (fieldErrors.email) {
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }
              if (formError) {
                setFormError(null);
              }
            }}
            disabled={isBusy}
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? "signin-email-error" : undefined
            }
            fullWidth
            className={`h-10 w-full rounded-lg border bg-[#fafcfa] px-3.5 text-sm text-[#1d271f] placeholder:text-[#1d271f]/45 transition-colors focus:outline-none focus:ring-2 ${
              fieldErrors.email
                ? "border-[#d03739] focus:border-[#d03739] focus:ring-[#d03739]/20"
                : "border-[#e1e8e1] focus:border-[#05893e] focus:ring-[#05893e]/20"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          />
          {fieldErrors.email ? (
            <p
              id="signin-email-error"
              role="alert"
              className="text-xs font-medium text-[#d03739]"
            >
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <PasswordField
          id="signin-password"
          name="password"
          label="পাসওয়ার্ড"
          placeholder="আপনার পাসওয়ার্ড লিখুন"
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (fieldErrors.password) {
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }
            if (formError) {
              setFormError(null);
            }
          }}
          error={fieldErrors.password}
          disabled={isBusy}
          autoComplete="current-password"
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isDisabled={isBusy}
          className="mt-1 h-10 w-full rounded-lg border border-[#047f39] bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span
                className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin shrink-0"
                aria-hidden="true"
              />
              <span>সাইন ইন হচ্ছে...</span>
            </>
          ) : (
            <span>সাইন ইন করুন</span>
          )}
        </Button>
      </form>

      <SocialAuthButtons
        callbackUrl={safeCallbackUrl}
        googleEnabled={googleEnabled}
        githubEnabled={githubEnabled}
        disabled={isSubmitting}
        onBusyChange={setIsSocialBusy}
      />

      <p className="text-center text-sm text-[#1d271f]/75">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href={signUpHref}
          className="font-semibold text-[#05893e] hover:text-[#047f39] underline-offset-4 hover:underline"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}

