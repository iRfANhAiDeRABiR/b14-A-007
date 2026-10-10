"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import type { CategoryItem } from "@/types/market";
import CategoryNav from "./CategoryNav";
import AuthActions from "./AuthActions";

interface MobileNavigationProps {
  categories?: CategoryItem[];
  isLoadingCategories?: boolean;
}

export default function MobileNavigation({
  categories = [],
  isLoadingCategories = false,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="md:hidden">
      <Button
        variant="outline"
        size="sm"
        isIconOnly
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
        onPress={() => setIsOpen((prev) => !prev)}
        className="border border-[#e1e8e1] bg-white text-[#1d271f] hover:bg-[#f0f5f0] w-9 h-9 rounded-lg flex items-center justify-center"
      >
        {isOpen ? (
          <Xmark className="w-5 h-5" aria-hidden="true" />
        ) : (
          <Bars className="w-5 h-5" aria-hidden="true" />
        )}
      </Button>

      {isOpen ? (
        <>
          <div
            aria-hidden="true"
            onClick={closeMenu}
            className="fixed inset-0 top-[68px] z-40 bg-black/25 backdrop-blur-[1px]"
          />

          <div
            id="mobile-navigation-panel"
            role="dialog"
            aria-modal="true"
            aria-label="মোবাইল নেভিগেশন মেনু"
            className="fixed inset-x-0 top-[68px] z-50 border-b border-[#e1e8e1] bg-white px-4 py-5 shadow-lg max-h-[calc(100vh-68px)] overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto flex flex-col gap-5">
              <div>
                <p className="text-xs font-semibold text-[#1d271f]/60 mb-2 px-1">
                  ক্যাটাগরিসমূহ
                </p>
                <CategoryNav
                  categories={categories}
                  isLoading={isLoadingCategories}
                  onNavigate={closeMenu}
                  orientation="vertical"
                />
              </div>

              <div className="border-t border-[#e1e8e1] pt-4">
                <AuthActions onNavigate={closeMenu} fullWidth />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

