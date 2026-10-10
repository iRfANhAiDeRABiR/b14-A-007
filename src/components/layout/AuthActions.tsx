"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Skeleton, buttonVariants } from "@heroui/react";
import { ArrowRightFromSquare, Person } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface AuthActionsProps {
  onNavigate?: () => void;
  fullWidth?: boolean;
}

function getUserInitial(name?: string | null, email?: string | null): string {
  const source = (name || email || "ব").trim();
  return source.charAt(0).toUpperCase() || "ব";
}

function isSafeImageUrl(url?: string | null): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

interface UserAvatarBadgeProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

function UserAvatarBadge({ name, email, image }: UserAvatarBadgeProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const initial = getUserInitial(name, email);
  const canRenderImage = isSafeImageUrl(image) && failedImageUrl !== image;

  return (
    <span className="w-7 h-7 rounded-lg bg-[#05893e] text-[#f3fbf4] text-xs font-bold flex items-center justify-center overflow-hidden shrink-0">
      {canRenderImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name || "ব্যবহারকারী"}
          referrerPolicy="no-referrer"
          onError={() => setFailedImageUrl(image)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </span>
  );
}

export default function AuthActions({
  onNavigate,
  fullWidth = false,
}: AuthActionsProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const isSigningOutRef = useRef(false);

  async function handleSignOut() {
    if (isSigningOutRef.current) {
      return;
    }

    isSigningOutRef.current = true;
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        isSigningOutRef.current = false;
        setIsSigningOut(false);
        return;
      }

      onNavigate?.();
      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      isSigningOutRef.current = false;
      setIsSigningOut(false);
    }
  }

  if (isPending) {
    return (
      <div
        aria-busy="true"
        aria-label="অ্যাকাউন্টের তথ্য লোড হচ্ছে"
        className={
          fullWidth
            ? "flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full"
            : "flex items-center gap-2.5"
        }
      >
        <Skeleton
          className={
            fullWidth ? "h-9 w-full rounded-lg" : "h-9 w-24 rounded-lg"
          }
        />
        <Skeleton
          className={
            fullWidth ? "h-9 w-full rounded-lg" : "h-9 w-24 rounded-lg"
          }
        />
      </div>
    );
  }

  if (session?.user) {
    const displayName =
      session.user.name?.trim() ||
      session.user.email?.split("@")[0] ||
      "ব্যবহারকারী";

    if (fullWidth) {
      return (
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-3 rounded-xl border border-[#e1e8e1] bg-[#f0f5f0]/60 px-3 py-2.5">
            <UserAvatarBadge
              name={session.user.name}
              email={session.user.email}
              image={session.user.image}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#1d271f] truncate">
                {displayName}
              </p>
              {session.user.email ? (
                <p className="text-xs text-[#1d271f]/60 truncate">
                  {session.user.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
            <Link
              href="/profile"
              onClick={onNavigate}
              className={`${buttonVariants({
                variant: "outline",
                size: "sm",
                fullWidth: true,
              })} border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] font-semibold px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2 transition-colors`}
            >
              <Person className="w-4 h-4 text-[#05893e]" aria-hidden="true" />
              <span>প্রোফাইল</span>
            </Link>

            <Button
              type="button"
              variant="outline"
              size="sm"
              isDisabled={isSigningOut}
              onPress={handleSignOut}
              className="w-full border border-[#d03739]/35 bg-white hover:bg-[#d03739]/10 text-[#d03739] font-semibold px-4 py-2 rounded-lg inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              <ArrowRightFromSquare className="w-4 h-4" aria-hidden="true" />
              <span>
                {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
              </span>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2.5">
        <Link
          href="/profile"
          onClick={onNavigate}
          aria-label={`${displayName} - প্রোফাইল`}
          className="h-9 pl-1.5 pr-3 rounded-lg border border-[#e1e8e1] bg-white hover:bg-[#f0f5f0] text-[#1d271f] inline-flex items-center gap-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e]"
        >
          <UserAvatarBadge
            name={session.user.name}
            email={session.user.email}
            image={session.user.image}
          />
          <span className="max-w-[120px] truncate text-sm font-semibold text-[#1d271f]">
            {displayName}
          </span>
          <span className="rounded-md bg-[#05893e]/10 px-2 py-0.5 text-xs font-semibold text-[#05893e]">
            প্রোফাইল
          </span>
        </Link>

        <Button
          type="button"
          variant="outline"
          size="sm"
          isDisabled={isSigningOut}
          onPress={handleSignOut}
          className="h-9 border border-[#d03739]/35 bg-white hover:bg-[#d03739]/10 text-[#d03739] font-semibold px-3.5 rounded-lg inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-60"
        >
          <ArrowRightFromSquare className="w-4 h-4" aria-hidden="true" />
          <span>{isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>
        </Button>
      </div>
    );
  }

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
