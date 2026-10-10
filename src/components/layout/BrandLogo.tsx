import Image from "next/image";
import Link from "next/link";

function getFormattedBanglaDate(): string {
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
      className="inline-flex flex-col gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#05893e] rounded-md"
    >
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo-icon.png"
          alt="বাজার দর লোগো"
          width={24}
          height={24}
          className="w-6 h-6 object-contain"
          priority
        />
        <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#05893e]">
          বাজার দর
        </span>
      </div>
      <time
        dateTime={new Date().toISOString().split("T")[0]}
        suppressHydrationWarning
        className="text-xs font-normal text-[#1d271f]/70"
      >
        {banglaDate}
      </time>
    </Link>
  );
}
