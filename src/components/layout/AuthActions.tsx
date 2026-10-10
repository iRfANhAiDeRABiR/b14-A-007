"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton, buttonVariants } from "@heroui/react";
import {
  ArrowRightFromSquare,
  ChevronDown,
  Person,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface AuthActionsProps {
  onNavigate?: () => void;
  fullWidth?: boolean;
}

function getUserInitial(name?: string | null, email?: string | null): string {
  const source = (name || email || "ব").trim();
  return Array.from(source)[0]?.toUpperCase() || "ব";
}

function getFullDisplayName(
  name?: string | null,
  email?: string | null
): string {
  const trimmedName = name?.trim();
  if (trimmedName) {
    return trimmedName;
  }
  const emailPrefix = email?.split("@")[0]?.trim();
  return emailPrefix || "ব্যবহারকারী";
}

function getShortDisplayName(
  name?: string | null,
  email?: string | null
): string {
  const trimmedName = name?.trim();
  if (trimmedName) {
    return trimmedName.split(/\s+/)[0] || trimmedName;
  }
  const emailPrefix = email?.split("@")[0]?.trim();
  return emailPrefix || "ব্যবহারকারী";
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
    <span className="w-9 h-9 rounded-[10.5px] bg-[#05893e] text-[#f3fbf4] text-sm font-bold flex items-center justify-center overflow-hidden shrink-0 shadow-2xs select-none">
      {canRenderImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={name?.trim() || "ব্যবহারকারী"}
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
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const isSigningOutRef = useRef(false);

  const isDropdownOpen = openPathname === pathname;

  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const profileItemRef = useRef<HTMLAnchorElement>(null);
  const signOutItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    function handlePointerDownOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (
        dropdownContainerRef.current &&
        target &&
        !dropdownContainerRef.current.contains(target)
      ) {
        setOpenPathname(null);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpenPathname(null);
        triggerButtonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDownOutside);
    document.addEventListener("touchstart", handlePointerDownOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handlePointerDownOutside);
      document.removeEventListener("touchstart", handlePointerDownOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDropdownOpen]);

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpenPathname(pathname);
      requestAnimationFrame(() => {
        profileItemRef.current?.focus();
      });
    }
  }

  function handleMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (document.activeElement === profileItemRef.current) {
        signOutItemRef.current?.focus();
      } else {
        profileItemRef.current?.focus();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (document.activeElement === signOutItemRef.current) {
        profileItemRef.current?.focus();
      } else {
        signOutItemRef.current?.focus();
      }
    }
  }

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

      setOpenPathname(null);
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
            : "flex items-center gap-2"
        }
      >
        {fullWidth ? (
          <>
            <Skeleton className="h-9 w-full rounded-lg" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </>
        ) : (
          <Skeleton className="h-10 w-28 rounded-lg" />
        )}
      </div>
    );
  }

  if (session?.user) {
    const fullName = getFullDisplayName(session.user.name, session.user.email);
    const shortName = getShortDisplayName(session.user.name, session.user.email);
    const userEmail = session.user.email?.trim() || "";

    if (fullWidth) {
      return (
        <div className="w-full rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-2.5 shadow-2xs">
          <div className="flex items-center gap-3 px-3 py-2 text-left">
            <UserAvatarBadge
              name={session.user.name}
              email={session.user.email}
              image={session.user.image}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#1d271f] leading-snug truncate">
                {fullName}
              </p>
              {userEmail ? (
                <p className="text-xs text-[#1d271f]/65 leading-normal truncate">
                  {userEmail}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-1 flex flex-col">
            <Link
              href="/profile"
              onClick={onNavigate}
              className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-normal text-[#1d271f] hover:bg-[#f0f5f0] focus:outline-none focus-visible:bg-[#f0f5f0] transition-colors"
            >
              <Person
                className="w-4 h-4 text-[#1d271f]/75 shrink-0"
                aria-hidden="true"
              />
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              type="button"
              disabled={isSigningOut}
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-normal text-[#d03739] hover:bg-[#fff6f5] focus:outline-none focus-visible:bg-[#fff6f5] transition-colors cursor-pointer disabled:opacity-60 text-left"
            >
              <ArrowRightFromSquare
                className="w-4 h-4 text-[#d03739] shrink-0"
                aria-hidden="true"
              />
              <span>{isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div ref={dropdownContainerRef} className="relative inline-flex items-center">
        <button
          ref={triggerButtonRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-controls="navbar-user-dropdown"
          onClick={() =>
            setOpenPathname((prev) => (prev === pathname ? null : pathname))
          }
          onKeyDown={handleTriggerKeyDown}
          className="h-10 px-2.5 rounded-lg inline-flex items-center gap-2 text-[#1d271f] hover:bg-[#f0f5f0] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e]"
        >
          <UserAvatarBadge
            name={session.user.name}
            email={session.user.email}
            image={session.user.image}
          />
          <span className="max-w-[120px] truncate text-sm font-medium text-[#1d271f]">
            {shortName}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`w-3.5 h-3.5 text-[#1d271f]/80 shrink-0 transition-transform duration-150 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isDropdownOpen ? (
          <div
            id="navbar-user-dropdown"
            role="menu"
            aria-label="ব্যবহারকারী মেনু"
            onKeyDown={handleMenuKeyDown}
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-[260px] max-w-[calc(100vw-2rem)] rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-2.5 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]"
          >
            <div className="px-3 py-2 text-left">
              <p className="text-sm font-semibold text-[#1d271f] leading-snug truncate">
                {fullName}
              </p>
              {userEmail ? (
                <p className="text-xs text-[#1d271f]/65 leading-normal truncate mt-0.5">
                  {userEmail}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <Link
                ref={profileItemRef}
                href="/profile"
                role="menuitem"
                onClick={() => {
                  setOpenPathname(null);
                  onNavigate?.();
                }}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm font-normal text-[#1d271f] hover:bg-[#f0f5f0] focus:outline-none focus-visible:bg-[#f0f5f0] transition-colors"
              >
                <Person
                  className="w-4 h-4 text-[#1d271f]/75 shrink-0"
                  aria-hidden="true"
                />
                <span>আমার প্রোফাইল</span>
              </Link>

              <button
                ref={signOutItemRef}
                type="button"
                role="menuitem"
                disabled={isSigningOut}
                onClick={handleSignOut}
                className="w-full flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm font-normal text-[#d03739] hover:bg-[#fff6f5] focus:outline-none focus-visible:bg-[#fff6f5] transition-colors cursor-pointer disabled:opacity-60 text-left"
              >
                <ArrowRightFromSquare
                  className="w-4 h-4 text-[#d03739] shrink-0"
                  aria-hidden="true"
                />
                <span>{isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}</span>
              </button>
            </div>
          </div>
        ) : null}
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

