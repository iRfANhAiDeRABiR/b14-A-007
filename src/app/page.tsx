import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Chip,
} from "@heroui/react";
import { ArrowDown, ShoppingCart } from "@gravity-ui/icons";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <header className="border-b border-emerald-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="বাজার দর হোমপেজ"
            className="flex items-center gap-2 text-xl font-bold text-emerald-700"
          >
            <ShoppingCart className="w-6 h-6" aria-hidden="true" />
            <span>বাজার দর</span>
          </Link>

          <nav aria-label="প্রধান নেভিগেশন" className="flex items-center gap-6 text-sm font-medium text-zinc-700">
            <Link href="/" className="text-emerald-700 font-semibold">
              হোম
            </Link>
            <Link href="#all-products" className="hover:text-emerald-700 transition-colors">
              সব পণ্য
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-4 py-12 sm:py-20">
          <Card className="max-w-2xl mx-auto border border-emerald-100 bg-emerald-50/40 p-6 sm:p-10 shadow-sm">
            <CardHeader className="flex flex-col items-start gap-3">
              <Chip color="success" variant="soft" size="sm">
                দৈনিক বাজার দর আপডেট
              </Chip>
              <CardTitle className="text-3xl sm:text-4xl font-bold text-zinc-900">
                বাজার দর
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-zinc-600">
                প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              <div id="all-products" className="flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  aria-label="সব পণ্য দেখুন"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                >
                  <span>সব পণ্য দেখুন</span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-zinc-600 text-center sm:text-left">
          <p className="font-medium text-zinc-800">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
        </div>
      </footer>
    </div>
  );
}
