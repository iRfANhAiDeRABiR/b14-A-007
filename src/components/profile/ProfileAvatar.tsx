"use client";

import { useState } from "react";

interface ProfileAvatarProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
}

function getUserInitial(name?: string | null, email?: string | null): string {
  const source = (name || email || "ব").trim();
  return Array.from(source)[0]?.toUpperCase() || "ব";
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

export default function ProfileAvatar({
  name,
  email,
  image,
  size = "lg",
}: ProfileAvatarProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const initial = getUserInitial(name, email);
  const canRenderImage = isSafeImageUrl(image) && failedImageUrl !== image;

  const sizeClassName =
    size === "sm"
      ? "w-9 h-9 rounded-xl text-sm"
      : size === "md"
        ? "w-14 h-14 rounded-2xl text-xl"
        : "w-18 h-18 sm:w-20 sm:h-20 rounded-2xl text-2xl sm:text-3xl";

  return (
    <div
      className={`${sizeClassName} bg-[#05893e] text-[#f3fbf4] font-bold flex items-center justify-center overflow-hidden shrink-0 shadow-2xs select-none`}
    >
      {canRenderImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={`${name?.trim() || "ব্যবহারকারী"}-এর প্রোফাইল ছবি`}
          referrerPolicy="no-referrer"
          onError={() => setFailedImageUrl(image)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initial}</span>
      )}
    </div>
  );
}

