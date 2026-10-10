import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছসহ দৈনন্দিন প্রয়োজনীয় পণ্যের বাজারদর সহজেই দেখুন এক জায়গায়।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} light`}
      data-theme="light"
    >
      <body
        style={{ fontFamily: "var(--font-hind-siliguri), sans-serif" }}
        className="min-h-screen flex flex-col bg-[#fafcfa] text-[#1d271f] antialiased overflow-x-hidden"
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
