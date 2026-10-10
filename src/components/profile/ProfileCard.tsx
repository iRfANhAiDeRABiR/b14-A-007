import Link from "next/link";
import { Card, CardContent, buttonVariants } from "@heroui/react";
import {
  ArrowChevronRight,
  ArrowLeft,
  Calendar,
  Envelope,
  Pencil,
  Person,
  ShieldCheck,
} from "@gravity-ui/icons";
import { formatBengaliDate } from "@/lib/utils/bengali";
import ProfileAvatar from "./ProfileAvatar";

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: Date | string | null;
}

interface ProfileCardProps {
  user: ProfileUser;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const displayName = user.name?.trim() || "ব্যবহারকারী";
  const formattedCreatedAt = formatBengaliDate(user.createdAt);
  const hasVerificationStatus = typeof user.emailVerified === "boolean";

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
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
        <span aria-current="page" className="font-semibold text-[#1d271f]">
          আমার প্রোফাইল
        </span>
      </nav>

      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f] leading-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-sm sm:text-base text-[#1d271f]/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখতে ও পরিবর্তন করতে পারবেন।
        </p>
      </div>

      <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <ProfileAvatar
                name={user.name}
                email={user.email}
                image={user.image}
                size="lg"
              />
              <div className="min-w-0 flex flex-col gap-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1d271f] break-words">
                  {displayName}
                </h2>
                <p className="text-sm sm:text-base text-[#1d271f]/70 break-all">
                  {user.email}
                </p>
                {hasVerificationStatus ? (
                  <div className="pt-1">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        user.emailVerified
                          ? "bg-[#e2f5e9] text-[#05893e]"
                          : "bg-[#f0f5f0] text-[#1d271f]/70 border border-[#e1e8e1]"
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        {user.emailVerified
                          ? "ইমেইল যাচাই করা হয়েছে"
                          : "ইমেইল যাচাই করা হয়নি"}
                      </span>
                    </span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="sm:shrink-0">
              <Link
                href="/profile/update"
                className={`${buttonVariants({
                  variant: "primary",
                  size: "md",
                })} w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-5 py-2.5 rounded-lg transition-colors`}
              >
                <Pencil className="w-4 h-4" aria-hidden="true" />
                <span>তথ্য আপডেট করুন</span>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] shadow-2xs">
        <CardContent className="p-5 sm:p-6 space-y-5">
          <h2 className="text-base sm:text-lg font-bold text-[#1d271f]">
            তথ্য
          </h2>

          <dl className="divide-y divide-[#e1e8e1]/80 rounded-xl border border-[#e1e8e1] bg-white overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
              <dt className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1d271f]/70">
                <Person className="w-4 h-4 text-[#05893e]" aria-hidden="true" />
                <span>নাম</span>
              </dt>
              <dd className="text-sm sm:text-base font-bold text-[#1d271f] break-words sm:text-right">
                {displayName}
              </dd>
            </div>

            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 bg-[#f0f5f0]/40">
              <dt className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1d271f]/70">
                <Envelope
                  className="w-4 h-4 text-[#05893e]"
                  aria-hidden="true"
                />
                <span>ইমেইল ঠিকানা</span>
              </dt>
              <dd className="text-sm sm:text-base font-semibold text-[#1d271f] break-all sm:text-right">
                {user.email}
              </dd>
            </div>

            {formattedCreatedAt ? (
              <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                <dt className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1d271f]/70">
                  <Calendar
                    className="w-4 h-4 text-[#05893e]"
                    aria-hidden="true"
                  />
                  <span>অ্যাকাউন্ট তৈরির তারিখ</span>
                </dt>
                <dd className="text-sm sm:text-base font-medium text-[#1d271f] sm:text-right">
                  {formattedCreatedAt}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <Link
              href="/"
              className={`${buttonVariants({
                variant: "outline",
                size: "md",
              })} border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] font-semibold px-5 py-2.5 rounded-lg inline-flex items-center justify-center gap-2 transition-colors`}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>হোম পেজে ফিরে যান</span>
            </Link>

            <Link
              href="/profile/update"
              className={`${buttonVariants({
                variant: "primary",
                size: "md",
              })} bg-[#05893e] hover:bg-[#047f39] text-[#f3fbf4] font-semibold px-6 py-2.5 rounded-lg inline-flex items-center justify-center gap-2 transition-colors`}
            >
              <Pencil className="w-4 h-4" aria-hidden="true" />
              <span>তথ্য আপডেট করুন</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

