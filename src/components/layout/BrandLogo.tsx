import Image from "next/image";
import Link from "next/link";

export function getFormattedBanglaDate(): string {
  const formatter = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
  return formatter.format(new Date());
}

export default function BrandLogo() {
  const banglaDate = getFormattedBanglaDate();

  return (
    <Link
      href="/"
      aria-label="বাজার দর হোমপেজ"
      className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] rounded-lg"
    >
      <div className="w-10 h-10 rounded-xl bg-[#05893e] flex items-center justify-center shrink-0 shadow-2xs">
        <Image
          src="/images/logo-icon.png"
          alt="বাজার দর লোগো"
          width={22}
          height={22}
          className="w-5 h-5 object-contain"
          priority
        />
      </div>

      <div className="flex flex-col">
        <span className="text-lg sm:text-xl font-bold leading-tight text-[#1d271f]">
          বাজার দর
        </span>
        <time
          dateTime={new Date().toISOString().split("T")[0]}
          suppressHydrationWarning
          className="text-xs font-normal text-[#1d271f]/65 leading-snug"
        >
          {banglaDate}
        </time>
      </div>
    </Link>
  );
}
