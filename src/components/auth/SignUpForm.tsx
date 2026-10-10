"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import {
  getSignUpErrorMessage,
  normalizeEmailInput,
  validateSignUpInput,
  type SignUpFormErrors,
} from "@/lib/utils/auth-errors";
import {
  buildAuthPageHref,
  resolveSafeCallbackUrl,
} from "@/lib/utils/auth-redirect";
import PasswordField from "./PasswordField";
import SocialAuthButtons from "./SocialAuthButtons";

interface SignUpFormProps {
  callbackUrl?: string;
  googleEnabled: boolean;
  githubEnabled: boolean;
}

export default function SignUpForm({
  callbackUrl,
  googleEnabled,
  githubEnabled,
}: SignUpFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<SignUpFormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSocialBusy, setIsSocialBusy] = useState(false);
  const isSubmittingRef = useRef(false);

  const safeCallbackUrl = resolveSafeCallbackUrl(callbackUrl);
  const signInHref = buildAuthPageHref("/signin", safeCallbackUrl);
  const isBusy = isSubmitting || isSocialBusy;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current || isSocialBusy) {
      return;
    }

    setFormError(null);
    const validation = validateSignUpInput({
      name,
      email,
      password,
      confirmPassword,
    });

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
      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email: normalizeEmailInput(email),
        password,
      });

      if (error || !data) {
        const message = getSignUpErrorMessage(error);
        setFormError(message);
        toast.error(message);
        isSubmittingRef.current = false;
        setIsSubmitting(false);
        return;
      }

      if (data.token) {
        await authClient.signOut();
      }

      toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে সাইন ইন করুন।");
      router.push(signInHref);
      router.refresh();
    } catch {
      const message = "অ্যাকাউন্ট তৈরি করা যাচ্ছে না। আবার চেষ্টা করুন।";
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
            htmlFor="signup-name"
            isInvalid={Boolean(fieldErrors.name)}
            isDisabled={isBusy}
            className="text-sm font-medium text-[#1d271f]"
          >
            আপনার নাম
          </Label>
          <Input
            id="signup-name"
            name="name"
            type="text"
            placeholder="সম্পূর্ণ নাম লিখুন"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (fieldErrors.name) {
                setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }
              if (formError) {
                setFormError(null);
              }
            }}
            disabled={isBusy}
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={
              fieldErrors.name ? "signup-name-error" : undefined
            }
            fullWidth
            className={`h-10 w-full rounded-lg border bg-[#fafcfa] px-3.5 text-sm text-[#1d271f] placeholder:text-[#1d271f]/45 transition-colors focus:outline-none focus:ring-2 ${
              fieldErrors.name
                ? "border-[#d03739] focus:border-[#d03739] focus:ring-[#d03739]/20"
                : "border-[#e1e8e1] focus:border-[#05893e] focus:ring-[#05893e]/20"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          />
          {fieldErrors.name ? (
            <p
              id="signup-name-error"
              role="alert"
              className="text-xs font-medium text-[#d03739]"
            >
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="signup-email"
            isInvalid={Boolean(fieldErrors.email)}
            isDisabled={isBusy}
            className="text-sm font-medium text-[#1d271f]"
          >
            ইমেইল ঠিকানা
          </Label>
          <Input
            id="signup-email"
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
              fieldErrors.email ? "signup-email-error" : undefined
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
              id="signup-email-error"
              role="alert"
              className="text-xs font-medium text-[#d03739]"
            >
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <PasswordField
          id="signup-password"
          name="password"
          label="পাসওয়ার্ড"
          placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড লিখুন"
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
          autoComplete="new-password"
        />

        <PasswordField
          id="signup-confirm-password"
          name="confirmPassword"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          placeholder="পাসওয়ার্ড আবার লিখুন"
          value={confirmPassword}
          onChange={(value) => {
            setConfirmPassword(value);
            if (fieldErrors.confirmPassword) {
              setFieldErrors((prev) => ({
                ...prev,
                confirmPassword: undefined,
              }));
            }
            if (formError) {
              setFormError(null);
            }
          }}
          error={fieldErrors.confirmPassword}
          disabled={isBusy}
          autoComplete="new-password"
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
              <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
            </>
          ) : (
            <span>অ্যাকাউন্ট তৈরি করুন</span>
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
        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
        <Link
          href={signInHref}
          className="font-semibold text-[#05893e] hover:text-[#047f39] underline-offset-4 hover:underline"
        >
          সাইন ইন করুন
        </Link>
      </p>
    </div>
  );
}

