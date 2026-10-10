import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="light" data-theme="light">
      <body className="min-h-screen flex flex-col bg-slate-50 text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
