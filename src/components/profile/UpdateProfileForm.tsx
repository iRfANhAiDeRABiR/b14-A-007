"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, buttonVariants } from "@heroui/react";
import {
  ArrowChevronRight,
  ArrowLeft,
  Check,
  Envelope,
  Person,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { buildProtectedSignInRedirectUrl } from "@/lib/utils/auth-redirect";
import ProfileAvatar from "./ProfileAvatar";

interface UpdateProfileFormProps {
  initialName: string;
  email: string;
  image?: string | null;
}

const VALID_NAME_PATTERN = /^[\p{L}\p{M}\s.'()-]+$/u;

function normalizeNameInput(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function validateProfileName(
  rawValue: string,
  currentName: string
): { valid: true; normalizedName: string } | { valid: false; error: string } {
  const normalizedName = normalizeNameInput(rawValue);
  const normalizedCurrent = normalizeNameInput(currentName);

  if (!normalizedName) {
    return {
      valid: false,
      error: "অনুগ্রহ করে আপনার নাম লিখুন।",
    };
  }

  if (
    normalizedName.length < 2 ||
    normalizedName.length > 80 ||
    !VALID_NAME_PATTERN.test(normalizedName)
  ) {
    return {
      valid: false,
      error: "অনুগ্রহ করে একটি সঠিক নাম লিখুন।",
    };
  }

  if (normalizedName === normalizedCurrent) {
    return {
      valid: false,
      error: "নামে কোনো পরিবর্তন করা হয়নি।",
    };
  }

  return {
    valid: true,
    normalizedName,
  };
}

export default function UpdateProfileForm({
  initialName,
  email,
  image,
}: UpdateProfileFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    setFieldError(null);
    setFormError(null);

    const validation = validateProfileName(name, initialName);
    if (!validation.valid) {
      setFieldError(validation.error);
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const { error } = await authClient.updateUser({
        name: validation.normalizedName,
      });

      if (error) {
        if (error.status === 401 || error.status === 403) {
          toast.error(
            "আপনার সেশনের মেয়াদ শেষ হয়েছে। অনুগ্রহ করে আবার সাইন ইন করুন।"
          );
          router.replace(buildProtectedSignInRedirectUrl("/profile/update"));
          router.refresh();
          return;
        }

        const message = "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।";
        setFormError(message);
        toast.error(message);
        return;
      }

      toast.success("আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch {
      const message = "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।";
      setFormError(message);
      toast.error(message);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <nav
        aria-label="ব্রেডক্রাম্ব নেভিগেশন"
        className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-[#1d271f]/65"
      >
        <Link
          href="/"
          className="font-medium hover:text-[#05893e] transition-colors"
        >
          হোম
        </Link>
        <ArrowChevronRight
          className="w-3.5 h-3.5 text-[#1d271f]/40 shrink-0"
          aria-hidden="true"
        />
        <Link
          href="/profile"
          className="font-medium hover:text-[#05893e] transition-colors"
        >
          আমার প্রোফাইল
        </Link>
        <ArrowChevronRight
          className="w-3.5 h-3.5 text-[#1d271f]/40 shrink-0"
          aria-hidden="true"
        />
        <span aria-current="page" className="font-semibold text-[#1d271f]">
          প্রোফাইল তথ্য আপডেট করুন
        </span>
      </nav>

      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f] leading-tight">
          প্রোফাইল তথ্য আপডেট করুন
        </h1>
        <p className="text-sm sm:text-base text-[#1d271f]/70">
          আপনার নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
        </p>
      </div>

      <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
        <CardContent className="p-5 sm:p-7 space-y-6">
          <div className="flex items-center gap-4 pb-5 border-b border-[#e1e8e1]">
            <ProfileAvatar
              name={name.trim() || initialName}
              email={email}
              image={image}
              size="md"
            />
            <div className="min-w-0">
              <p className="text-base sm:text-lg font-bold text-[#1d271f] truncate">
                {name.trim() || initialName || "ব্যবহারকারী"}
              </p>
              <p className="text-xs sm:text-sm text-[#1d271f]/65 break-all">
                {email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {formError ? (
              <div
                role="alert"
                className="rounded-xl border border-[#d03739]/30 bg-[#fff6f5] px-3.5 py-2.5 text-xs sm:text-sm font-medium text-[#d03739]"
              >
                {formError}
              </div>
            ) : null}

            <div className="space-y-1.5">
              <label
                htmlFor="profile-name"
                className="block text-sm font-semibold text-[#1d271f]"
              >
                আপনার নাম
              </label>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#1d271f]/45"
                >
                  <Person className="w-4 h-4" />
                </span>
                <input
                  id="profile-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  disabled={isSubmitting}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (fieldError) setFieldError(null);
                    if (formError) setFormError(null);
                  }}
                  placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                  aria-invalid={Boolean(fieldError)}
                  aria-describedby={
                    fieldError ? "profile-name-error" : undefined
                  }
                  className={`w-full h-11 rounded-xl border bg-white pl-10 pr-3.5 text-sm text-[#1d271f] placeholder:text-[#1d271f]/40 transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                    fieldError
                      ? "border-[#d03739] focus:border-[#d03739] focus:ring-[#d03739]/20"
                      : "border-[#e1e8e1] focus:border-[#05893e] focus:ring-[#05893e]/20"
                  }`}
                />
              </div>

              {fieldError ? (
                <p
                  id="profile-name-error"
                  role="alert"
                  className="text-xs font-medium text-[#d03739]"
                >
                  {fieldError}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="profile-email-readonly"
                className="block text-sm font-semibold text-[#1d271f]/75"
              >
                ইমেইল ঠিকানা (পরিবর্তনযোগ্য নয়)
              </label>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[#1d271f]/40"
                >
                  <Envelope className="w-4 h-4" />
                </span>
                <input
                  id="profile-email-readonly"
                  type="email"
                  value={email}
                  readOnly
                  disabled
                  aria-readonly="true"
                  className="w-full h-11 rounded-xl border border-[#e1e8e1] bg-[#f0f5f0]/80 pl-10 pr-3.5 text-sm text-[#1d271f]/65 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <Link
                href="/profile"
                aria-disabled={isSubmitting}
                className={`${buttonVariants({
                  variant: "outline",
                  size: "md",
                })} border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] font-semibold px-5 py-2.5 rounded-xl inline-flex items-center justify-center gap-2 transition-colors ${
                  isSubmitting ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>বাতিল করুন</span>
              </Link>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isDisabled={isSubmitting}
                className="h-11 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-6 inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="w-4 h-4 rounded-full border-2 border-[#f3fbf4]/35 border-t-[#f3fbf4] animate-spin"
                    />
                    <span>আপডেট হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>তথ্য আপডেট করুন (Update Information)</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
