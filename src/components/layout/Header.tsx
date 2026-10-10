import type { CategoryItem } from "@/types/market";
import BrandLogo from "./BrandLogo";
import CategoryNav from "./CategoryNav";
import AuthActions from "./AuthActions";
import MobileNavigation from "./MobileNavigation";

interface HeaderProps {
  categories?: CategoryItem[];
  isLoadingCategories?: boolean;
}

export default function Header({
  categories = [],
  isLoadingCategories = false,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-[#e1e8e1]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <BrandLogo />

        <div className="hidden lg:flex items-center justify-center flex-1 px-4">
          <CategoryNav
            categories={categories}
            isLoading={isLoadingCategories}
          />
        </div>

        <div className="hidden md:flex items-center shrink-0">
          <AuthActions />
        </div>

        <MobileNavigation
          categories={categories}
          isLoadingCategories={isLoadingCategories}
        />
      </div>

      <div className="hidden md:block lg:hidden border-t border-[#e1e8e1]/70 bg-[#fafcfa]">
        <div className="max-w-6xl mx-auto px-4 py-2 overflow-x-auto">
          <CategoryNav
            categories={categories}
            isLoading={isLoadingCategories}
          />
        </div>
      </div>
    </header>
  );
}
