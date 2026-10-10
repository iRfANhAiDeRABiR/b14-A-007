import type { CategoryItem } from "@/types/market";
import BrandLogo from "./BrandLogo";
import CategoryNav from "./CategoryNav";
import AuthActions from "./AuthActions";
import MobileNavigation from "./MobileNavigation";

interface HeaderProps {
  categories?: CategoryItem[];
  activeCategorySlug?: string;
  isLoadingCategories?: boolean;
}

export default function Header({
  categories = [],
  activeCategorySlug,
  isLoadingCategories = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#fafcfa]/95 backdrop-blur-xs">
      <div className="border-b border-[#e1e8e1]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <BrandLogo />

          <div className="hidden md:flex items-center shrink-0">
            <AuthActions />
          </div>

          <MobileNavigation
            categories={categories}
            activeCategorySlug={activeCategorySlug}
            isLoadingCategories={isLoadingCategories}
          />
        </div>
      </div>

      <div className="hidden md:block border-b border-[#e1e8e1] bg-[#fafcfa]">
        <div className="max-w-6xl mx-auto px-4 py-2.5">
          <CategoryNav
            categories={categories}
            activeCategorySlug={activeCategorySlug}
            isLoading={isLoadingCategories}
          />
        </div>
      </div>
    </header>
  );
}
